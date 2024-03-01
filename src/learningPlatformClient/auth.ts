/**
 * the headers required to authenticate with the CODE Learning Platform.
 */
export const getAuthHeaders = (accessToken: string) => ({
  authorization: 'Bearer ' + accessToken,
  Cookie: 'cid=' + accessToken,
});

export interface GetLearningPlatformAccessTokenResponse {
  /** e.g. `'Token used too late, 1709306766.181 > 1709305097: <...> (Error ID: 6905fc8c-1914-4ae5-ba32-1d6e33f38b3b)'` */
  errors?: { message: string; extensions: {} }[];
  data: {
    googleSignin: {
      token: string;
      __typename: 'AuthPayload';
    } | null;
  };
}

/**
 * returns an access token required to authenticate with the CODE Learning Platform.
 *
 * @param googleAccessToken a jwt issued by google to the learning platform
 */
export async function getLearningPlatformAccessToken(
  graphqlBaseUrl: string,
  googleAccessToken: string
) {
  const res = await fetch(graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: `{"operationName":"googleSignin","variables":{"code":"${googleAccessToken}"},"query":"mutation googleSignin($code: String!) {\\n  googleSignin(code: $code) {\\n    token\\n    __typename\\n  }\\n}"}`,
  });
  const data: GetLearningPlatformAccessTokenResponse = await res.json();

  if (data.errors) {
    if (data.errors[0].message.includes('Token used too late')) {
      throw new Error(
        `CodeUniversity.getLearningPlatformAccessToken: The google access token is expired. (original error: ${data.errors[0].message})`
      );
    }
    throw new Error(
      `CodeUniversity.getLearningPlatformAccessToken: Unknown error. (original error: ${data.errors[0].message})`
    );
  }
  return data;
}

export interface RefreshLearningPlatformAccessTokenResponse {
  ok: boolean;
  token: string;
}

/**
 * returns an access token required to authenticate with the CODE Learning Platform.
 */
export async function getRefreshedLearningPlatformAccessToken(
  baseUrl: string,
  oldAccessToken: string
): Promise<RefreshLearningPlatformAccessTokenResponse> {
  const res = await fetch(baseUrl + '/cid_refresh', {
    method: 'POST',
    headers: getAuthHeaders(oldAccessToken),
  });
  const data: RefreshLearningPlatformAccessTokenResponse = await res.json();

  return data;
}
