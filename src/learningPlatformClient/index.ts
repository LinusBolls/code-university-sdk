import { GraphQLClient, gql } from 'graphql-request';
import { RequestConfig } from './requestConfig';
import { getAllEvents, getOwnSettings } from './requests/general';
import { getAuthHeaders, getNewToken } from './auth';
import { config } from '../config';
import { assertGoogleCookieWasIssuedForLearningPlatform } from './googleCookie';

export interface LearningPlatformClientOptions {
  /** defaults to https://api.app.code.berlin/graphql */
  graphqlBaseUrl?: string;
  /** defaults to https://api.app.code.berlin */
  authBaseUrl?: string;
}

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
  }

  public get requestConfig(): RequestConfig {
    return {
      gql,
      graphqlClient: this.graphqlClient,
    };
  }

  public getAllEvents = this.handleError(() =>
    getAllEvents(this.requestConfig)
  );
  public getOwnSettings = this.handleError(() =>
    getOwnSettings(this.requestConfig)
  );

  public async makeRawQuery(query: string) {
    const res = await this.graphqlClient.request(query);

    return res;
  }

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

    return new LearningPlatformClient(null, googleCookie, options);
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
