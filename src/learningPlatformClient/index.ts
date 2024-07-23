import { gql, GraphQLClient } from 'graphql-request';

import { config } from '../config';
import { Mutation, Query } from '../graphql/graphql';
import { MutationRes, QueryRes } from '../publicUtil';
import { getAuthHeaders, getLearningPlatformAccessToken } from './auth';
import {
  assertGoogleAccessToken,
  assertLearningPlatformAccessToken,
  assertLearningPlatformRefreshToken,
} from './jwt';
import { LearningPlatformQueryExecutor } from './learningPlatformQueryExecutor';
import { getUnauthedRequestConfig, RequestConfig } from './requestConfig';
import { LearningPlatformRequest } from './requests';
import { getLearningPlatformRefreshToken, signIn } from './requests/general';

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

  private _refreshToken: string | null;
  private _accessToken: string | null;

  public get refreshToken() {
    return this._refreshToken;
  }
  public get accessToken() {
    return this._accessToken;
  }

  public readonly graphqlBaseUrl: string;
  public readonly baseUrl: string;

  private readonly fetch: RequestConfig['fetch'];

  private constructor(
    refreshToken: string | null,
    accessToken: string | null,
    options?: LearningPlatformClientOptions
  ) {
    this.graphqlBaseUrl = options?.graphqlBaseUrl || config.graphqlBaseUrl;
    this.baseUrl = options?.baseUrl || config.baseUrl;
    this.fetch = options?.fetch || fetch;

    this._refreshToken = refreshToken;
    this._accessToken = accessToken;

    this.graphqlClient = new GraphQLClient(this.graphqlBaseUrl, {
      headers: getAuthHeaders(this._refreshToken, this._accessToken),
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
      refreshToken: this._refreshToken,
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
      <Key extends keyof Query>(
        query: string | TemplateStringsArray,
        variables?: Record<string, unknown>
      ) =>
        this.graphqlClient.request<QueryRes<Key>>(
          typeof query === 'string' ? query : query.join(''),
          variables
        ),
      'raw.query'
    ),
    /**
     * we aim to support the most common mutations with typed methods, but if you have a niche use case that we don't yet "officially" support, you can use this method to manually construct a graphql mutation.
     *
     * check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql), and search for `type Mutation {` for starting off points.
     */
    mutation: this.handleError(
      <Key extends keyof Mutation>(
        mutation: string | TemplateStringsArray,
        variables?: Record<string, unknown>
      ) =>
        this.graphqlClient.request<MutationRes<Key>>(
          typeof mutation === 'string' ? mutation : mutation.join(''),
          variables
        ),
      'raw.mutation'
    ),
  };
  /**
   * @param token  a Learning Platform access token, Learning Platform refresh token, or Google access token.
   */
  static async fromAnyToken(
    token: string,
    options?: LearningPlatformClientOptions
  ) {
    try {
      return await LearningPlatformClient.fromRefreshToken(token, options);
    } catch (err) {}
    try {
      return await LearningPlatformClient.fromAccessToken(token, options);
    } catch (err) {}
    try {
      return await LearningPlatformClient.fromGoogleAccessToken(token, options);
    } catch (err) {}

    throw new Error(
      'CodeUniversity.LearningPlatformClient.fromAnyToken: Provided token is invalid'
    );
  }

  /**
   * the main way to initialize the class.
   *
   * the refresh token is the value of your `cid` cookie on the Learning Platform.
   *
   * @see https://github.com/linusBolls/code-university-sdk/?tab=readme-ov-file#retrieving-a-refresh-token-from-the-code-learning-platform
   */
  static async fromRefreshToken(
    refreshToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertLearningPlatformRefreshToken(refreshToken);

    const accessToken = await useOrGetNewTokenIfExpired(
      refreshToken,
      null,
      options
    );

    return new LearningPlatformClient(
      refreshToken,
      accessToken,
      options
    ) as unknown as LearningPlatformClientType;
  }

  /**
   * i don't know why you'd use this, since the client would only be valid for the duration of the access token, which is < 10mins.
   */
  static async fromAccessToken(
    accessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertLearningPlatformAccessToken(accessToken);

    return new LearningPlatformClient(
      null,
      accessToken,
      options
    ) as unknown as LearningPlatformClientType;
  }

  /**
   * i don't know how you'd even get a google access token but if you somehow aquired one, here you go
   */
  static async fromGoogleAccessToken(
    googleAccessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertGoogleAccessToken(googleAccessToken);

    const data = await getLearningPlatformRefreshToken(
      getUnauthedRequestConfig(options),
      googleAccessToken
    );
    if (data.refreshToken) {
      return LearningPlatformClient.fromRefreshToken(
        data.refreshToken,
        options
      );
    } else {
      return LearningPlatformClient.fromAccessToken(data.accessToken, options);
    }
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
    const refreshToken = data.signin!.token!;

    return LearningPlatformClient.fromRefreshToken(refreshToken, options);
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
        this._accessToken = await useOrGetNewTokenIfExpired(
          this._refreshToken,
          this._accessToken,
          {
            fetch: this.fetch,
            baseUrl: this.baseUrl,
          }
        );
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
    const data = await getLearningPlatformAccessToken(
      this.fetch,
      this.baseUrl,
      this._refreshToken!
    );

    if (!data.ok || !data.token)
      throw new Error(
        `CodeUniversity.LearningPlatformClient.refreshAccessToken: Failed to refresh access token. (response: ${JSON.stringify(data)})`
      );

    this._accessToken = data.token;

    this.graphqlClient.setHeaders(
      getAuthHeaders(this._refreshToken, this._accessToken)
    );

    return data.token;
  }
}

export type LearningPlatformClientType = LearningPlatformClient &
  LearningPlatformQueryExecutor;

async function useOrGetNewTokenIfExpired(
  refreshToken: string | null,
  accessToken: string | null,
  options?: LearningPlatformClientOptions
) {
  try {
    assertLearningPlatformAccessToken(accessToken);

    return accessToken;
  } catch (err) {
    if (
      (err as Error).message === 'CodeUniversity.assertJwt: Expired token' ||
      !accessToken
    ) {
      const res = await getLearningPlatformAccessToken(
        options?.fetch || fetch,
        options?.baseUrl || config.baseUrl,
        refreshToken
      );
      return res.token;
    } else {
      throw err;
    }
  }
}
