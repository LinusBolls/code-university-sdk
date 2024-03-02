import { GraphQLClient, gql } from 'graphql-request';
import { RequestConfig } from './requestConfig';
import {
  getAuthHeaders,
  getLearningPlatformAccessToken,
  getRefreshedLearningPlatformAccessToken,
} from './auth';
import { config } from '../config';
import {
  assertGoogleAccessToken,
  assertLearningPlatformAccessToken,
} from './jwt';
import { LearningPlatformRequest } from './requests';
import { LearningPlatformQueryExecutor } from './learningPlatformQueryExecutor';
import { MutationRes, QueryRes } from './requests/general';
import { Mutation, Query } from '../graphql/graphql';

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

  private _accessToken: string | null;

  public get accessToken() {
    return this._accessToken;
  }

  public readonly graphqlBaseUrl: string;
  public readonly baseUrl: string;

  private readonly fetch: RequestConfig['fetch'];

  private constructor(
    accessToken: string | null,
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
      this[key] = this.handleError((...args) =>
        // @ts-expect-error this is impossible to type lol
        func(this.requestConfig, ...args)
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
        )
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
        )
    ),
  };

  static async fromAccessToken(
    accessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertLearningPlatformAccessToken(accessToken);

    return new LearningPlatformClient(
      accessToken,
      options
    ) as unknown as LearningPlatformClient & LearningPlatformQueryExecutor;
  }

  static async fromGoogleAccessToken(
    googleAccessToken: string,
    options?: LearningPlatformClientOptions
  ) {
    assertGoogleAccessToken(googleAccessToken);

    const data = await getLearningPlatformAccessToken(
      options?.fetch || fetch,
      options?.graphqlBaseUrl || config.graphqlBaseUrl,
      googleAccessToken
    );
    const accessToken = data.data.googleSignin.token;

    return LearningPlatformClient.fromAccessToken(accessToken, options);
  }

  private handleError<Args extends unknown[], Return>(
    func: (...args: Args) => Return
  ): (...args: Args) => Return {
    return async function (...args: Args): Promise<Return> {
      try {
        return await func(...args);
      } catch (err) {
        const isIrrelevantWarning = err.message.includes(
          'GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.'
        );

        if (isIrrelevantWarning) {
          return;
        }

        const isInvalidToken = err.message.includes(
          "Auth: The Authorization token you provided is invalid/expired. You'll need to use a different one."
        );

        if (isInvalidToken) {
          await this.refreshAccessToken();

          try {
            return await func(...args);
          } catch (err2) {
            console.error('something went really wrong:', err2.message);
          }
        } else {
          throw err;
        }
      }
    }.bind(this);
  }
  private async refreshAccessToken() {
    const data = await getRefreshedLearningPlatformAccessToken(
      this.fetch,
      this.baseUrl,
      this._accessToken
    );

    if (!data.ok)
      throw new Error(
        `CodeUniversity.LearningPlatformClient.refreshAccessToken: Failed to refresh access token. (response: ${JSON.stringify(data)})`
      );

    this._accessToken = data.token;

    this.graphqlClient.setHeaders(getAuthHeaders(this._accessToken));

    return data.token;
  }
}
