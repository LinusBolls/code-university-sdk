import {
  assertLearningPlatformAccessToken,
  assertLearningPlatformRefreshToken,
} from './jwt';
import { RequestConfig } from './requestConfig';

/**
 * the headers required to authenticate with the CODE Learning Platform.
 */
export const getAuthHeaders = (
  refreshToken?: string | null,
  accessToken?: string | null
) => {
  const headers: Record<string, string> = {};

  if (refreshToken) {
    assertLearningPlatformRefreshToken(refreshToken);
    headers.Cookie = 'cid=' + refreshToken;
  }
  if (accessToken) {
    assertLearningPlatformAccessToken(accessToken);
    headers.authorization = 'Bearer ' + accessToken;
  }
  return headers;
};

export interface RefreshLearningPlatformAccessTokenResponse {
  ok: boolean;
  token: string;
}

/**
 * returns an access token required to authenticate with the CODE Learning Platform.
 */
export async function getLearningPlatformAccessToken(
  fetchImpl: RequestConfig['fetch'],
  baseUrl: string,
  refreshToken: string | null
): Promise<RefreshLearningPlatformAccessTokenResponse> {
  if (refreshToken != null) {
    assertLearningPlatformRefreshToken(refreshToken);
  }

  const res = await fetchImpl(baseUrl + '/cid_refresh', {
    method: 'POST',
    headers: getAuthHeaders(refreshToken),
  });
  const data: RefreshLearningPlatformAccessTokenResponse = await res.json();

  if (!data.ok || !data.token) {
    throw new Error(
      'CodeUniversity.getLearningPlatformAccessToken: Failed to get access token. (response: ' +
        JSON.stringify(data) +
        ')'
    );
  }
  return data;
}
