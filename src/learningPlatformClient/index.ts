import { GraphQLClient, gql } from 'graphql-request';
import { RequestConfig } from './requestConfig';
import { getAuthHeaders, getNewToken } from './auth';
import { config } from '../config';
import { assertGoogleCookieWasIssuedForLearningPlatform } from './googleCookie';
import { LearningPlatformRequest } from './requests';
import { LearningPlatformQueryExecutor } from './learningPlatformQueryExecutor';

export interface LearningPlatformClientOptions {
  /** defaults to https://api.app.code.berlin/graphql */
  graphqlBaseUrl?: string;
  /** defaults to https://api.app.code.berlin */
  authBaseUrl?: string;
}

/**
 * a wrapper for the internal graphql api of the [CODE Learning Platform](https://app.code.berlin).
 *
 * (1) automatically handles authentication under the hood
 *
 * (2) provides typed methods for some of the most common queries
 *
 * (3) allows for custom queries using `LearningPlatformClient.makeRawQuery`. check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql) for more info`
 */
export class LearningPlatformClient {
  private graphqlClient: GraphQLClient;

  private accessToken: string | null;

  public readonly graphqlBaseUrl: string;
  public readonly authBaseUrl: string;

  public readonly googleCookie: string;

  private constructor(
    accessToken: string | null,
    googleCookie: string,
    options?: LearningPlatformClientOptions
  ) {
    this.graphqlBaseUrl = options?.graphqlBaseUrl || config.graphqlBaseUrl;
    this.authBaseUrl = options?.authBaseUrl || config.authBaseUrl;

    this.accessToken = accessToken;
    this.googleCookie = googleCookie;

    this.graphqlClient = new GraphQLClient(this.graphqlBaseUrl, {
      headers: getAuthHeaders(this.accessToken),
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
      graphqlClient: this.graphqlClient,
    };
  }

  /**
   * we aim to support the most common queries with typed methods, but if you have a niche use case that we don't yet "officially" support, you can use this method to manually construct a graphql query or mutation.
   *
   * check out the [learning platform graphql schema](https://github.com/LinusBolls/code-university-sdk/blob/main/src/graphql/schema.graphql), and search for `type Query {` for starting off points.
   */
  public makeRawQuery = this.handleError((query: string) =>
    this.graphqlClient.request(query)
  );

  /**
   * will throw an error if
   * (1) the cookie doesn't match the expected format (`_ga=...; _ga_5SRD47N151=...; cid=...`)
   * (2) the cookie wasn't issued for the learning platform
   */
  static async fromGoogleCookie(
    googleCookie: string,
    options?: LearningPlatformClientOptions
  ) {
    assertGoogleCookieWasIssuedForLearningPlatform(googleCookie);

    return new LearningPlatformClient(
      null,
      googleCookie,
      options
    ) as unknown as LearningPlatformClient & LearningPlatformQueryExecutor;
  }
  private handleError<Args extends unknown[], Return>(
    func: (...args: Args) => Return
  ): (...args: Args) => Return {
    return async function (...args: Args): Promise<Return> {
      try {
        return await func(...args);
      } catch (err) {
        const isInvalidToken = err.message.includes(
          "Auth: The Authorization token you provided is invalid/expired. You'll need to use a different one."
        );

        if (isInvalidToken) {
          await this.getNewToken();

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
  private async getNewToken() {
    const res = await getNewToken(
      this.authBaseUrl,
      this.googleCookie,
      this.accessToken
    );

    if (!res.ok)
      throw new Error(
        'CodeUniversity.LearningPlatformClient.Auth: Failed to get new access token'
      );

    this.accessToken = res.token;

    this.graphqlClient.setHeaders(getAuthHeaders(this.accessToken));

    return res.token;
  }
}
