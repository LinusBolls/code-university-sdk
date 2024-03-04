import { gql, GraphQLClient } from 'graphql-request';

import { config } from '../config';
import { Mutation, Query } from '../graphql/graphql';
import {
  getAuthHeaders,
  getRefreshedLearningPlatformAccessToken,
} from './auth';
import {
  assertGoogleAccessToken,
  assertLearningPlatformAccessToken,
} from './jwt';
import { LearningPlatformQueryExecutor } from './learningPlatformQueryExecutor';
import { getUnauthedRequestConfig, RequestConfig } from './requestConfig';
import { LearningPlatformRequest } from './requests';
import {
  getLearningPlatformAccessToken,
  MutationRes,
  QueryRes,
  signIn,
} from './requests/general';

export interface LearningPlatformClientOptions {
  /** defaults to https://api.app.code.berlin/graphql */
  graphqlBaseUrl?: string;
  /** defaults to https://api.app.code.berlin */
  baseUrl?: string;

  fetch?: RequestConfig['fetch'];
}

/**
 * a wrapper for the internal graphql api of the [CODE Learning Platform](https://app.code.berlin).
 *
 * (1) automatically handles authentication under the hood
 *
 * (2) provides typed methods for some of the most common queries
 *
 * (3) allows for custom queries using the `.raw.query` and `.raw.mutation` methods. check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql) for starting off points
 */
export class LearningPlatformClient {
  private graphqlClient: GraphQLClient;

  private _accessToken: string;

  public get accessToken() {
    return this._accessToken;
  }

  public readonly graphqlBaseUrl: string;
  public readonly baseUrl: string;

  private readonly fetch: RequestConfig['fetch'];

  private constructor(
    accessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    this.graphqlBaseUrl = options?.graphqlBaseUrl || config.graphqlBaseUrl;
    this.baseUrl = options?.baseUrl || config.baseUrl;
    this.fetch = options?.fetch || fetch;

    this._accessToken = accessToken;

    this.graphqlClient = new GraphQLClient(this.graphqlBaseUrl, {
      headers: getAuthHeaders(this._accessToken),
      fetch: this.fetch,
    });

    for (const [key, func] of Object.entries(LearningPlatformRequest)) {
      // @ts-expect-error this is impossible to type lol
      this[key] = this.handleError(
        (...args) =>
          // @ts-expect-error this is impossible to type lol
          func(this.requestConfig, ...args),
        key
      );
    }
  }

  public get requestConfig(): RequestConfig {
    return {
      gql,
      fetch: this.fetch,
      graphqlClient: this.graphqlClient,
      accessToken: this._accessToken,
    };
  }

  public readonly raw = {
    /**
     * we aim to support the most common queries with typed methods, but if you have a niche use case that we don't yet "officially" support, you can use this method to manually construct a graphql query.
     *
     * check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql), and search for `type Query {` for starting off points.
     */
    query: this.handleError(
      <Key extends keyof Query>(query: string | TemplateStringsArray) =>
        this.graphqlClient.request<QueryRes<Key>>(
          typeof query === 'string' ? query : query.join('')
        ),
      'raw.query'
    ),
    /**
     * we aim to support the most common mutations with typed methods, but if you have a niche use case that we don't yet "officially" support, you can use this method to manually construct a graphql mutation.
     *
     * check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql), and search for `type Mutation {` for starting off points.
     */
    mutation: this.handleError(
      <Key extends keyof Mutation>(mutation: string | TemplateStringsArray) =>
        this.graphqlClient.request<MutationRes<Key>>(
          typeof mutation === 'string' ? mutation : mutation.join('')
        ),
      'raw.mutation'
    ),
  };

  static async fromAccessToken(
    accessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertLearningPlatformAccessToken(accessToken);

    const freshToken = await useOrGetNewTokenIfExpired(accessToken, options);

    return new LearningPlatformClient(
      freshToken,
      options
    ) as unknown as LearningPlatformClientType;
  }

  static async fromGoogleAccessToken(
    googleAccessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertGoogleAccessToken(googleAccessToken);

    const data = await getLearningPlatformAccessToken(
      getUnauthedRequestConfig(options),
      googleAccessToken
    );
    const accessToken = data.googleSignin!.token!;

    return LearningPlatformClient.fromAccessToken(accessToken, options);
  }

  static async fromCredentials(
    email: string,
    password: string,
    options?: LearningPlatformClientOptions
  ) {
    const data = await signIn(
      getUnauthedRequestConfig(options),
      email,
      password
    );
    const accessToken = data.signin!.token!;

    return LearningPlatformClient.fromAccessToken(accessToken, options);
  }

  private handleError<Args extends unknown[], Return extends Promise<unknown>>(
    func: (...args: Args) => Return,
    queryName: string
  ): (...args: Args) => Return {
    return async function (
      this: LearningPlatformClient,
      ...args: Args
      // @ts-expect-error haher
    ): Return {
      try {
        this._accessToken = await useOrGetNewTokenIfExpired(this._accessToken, {
          fetch: this.fetch,
          baseUrl: this.baseUrl,
        });
        return await func(...args);
      } catch (err) {
        const isIrrelevantWarning = (err as Error).message?.includes(
          'GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.'
        );

        if (isIrrelevantWarning) {
          // @ts-expect-error haher
          return;
        }

        const isInvalidToken = (err as Error).message?.includes(
          "Auth: The Authorization token you provided is invalid/expired. You'll need to use a different one."
        );

        if (isInvalidToken) {
          await this.refreshAccessToken();

          try {
            return await func(...args);
          } catch (secondErr) {
            throw new Error(
              `CodeUniversity.LearningPlatformClient.${queryName}: Unknown error. (original error: ${(secondErr as Error).message})`
            );
          }
        }
        throw new Error(
          `CodeUniversity.LearningPlatformClient.${queryName}: Unknown error. (original error: ${(err as Error).message})`
        );
      }
    }.bind(this);
  }
  private async refreshAccessToken() {
    const data = await getRefreshedLearningPlatformAccessToken(
      this.fetch,
      this.baseUrl,
      this._accessToken
    );

    if (!data.ok || !data.token)
      throw new Error(
        `CodeUniversity.LearningPlatformClient.refreshAccessToken: Failed to refresh access token. (response: ${JSON.stringify(data)})`
      );

    this._accessToken = data.token;

    this.graphqlClient.setHeaders(getAuthHeaders(this._accessToken));

    return data.token;
  }
}

export type LearningPlatformClientType = LearningPlatformClient &
  LearningPlatformQueryExecutor;

async function useOrGetNewTokenIfExpired(
  accessToken: string,
  options?: LearningPlatformClientOptions
) {
  const payload = assertLearningPlatformAccessToken(accessToken);

  const isExpired = payload.exp < Date.now() / 1000;

  if (!isExpired) return accessToken;

  const res = await getRefreshedLearningPlatformAccessToken(
    options?.fetch || fetch,
    options?.baseUrl || config.baseUrl,
    accessToken
  );
  return res.token;
}
