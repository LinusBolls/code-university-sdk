import { RequestConfig } from './requestConfig';

/**
 * the headers required to authenticate with the CODE Learning Platform.
 */
export const getAuthHeaders = (accessToken: string) => ({
  authorization: 'Bearer ' + accessToken,
  Cookie: 'cid=' + accessToken,
});

export interface RefreshLearningPlatformAccessTokenResponse {
  ok: boolean;
  token: string;
}

/**
 * returns an access token required to authenticate with the CODE Learning Platform.
 */
export async function getRefreshedLearningPlatformAccessToken(
  fetchImpl: RequestConfig['fetch'],
  baseUrl: string,
  oldAccessToken: string
): Promise<RefreshLearningPlatformAccessTokenResponse> {
  const res = await fetchImpl(baseUrl + '/cid_refresh', {
    method: 'POST',
    headers: getAuthHeaders(oldAccessToken),
  });
  const data: RefreshLearningPlatformAccessTokenResponse = await res.json();

  return data;
}
