const getAuthorizationHeader = (token: string) => 'Bearer ' + token;

export const getAuthHeaders = (token: string, googleCookie?: string) => ({
  authorization: getAuthorizationHeader(token),
  ...(googleCookie ? { Cookie: googleCookie } : {}),
});

export interface GetNewTokenResponse {
  ok: boolean;
  token: string;
}

export async function getNewToken(
  baseUrl: string,
  googleCookie: string,
  oldToken: string
): Promise<GetNewTokenResponse> {
  const res = await fetch(baseUrl + '/cid_refresh', {
    method: 'POST',
    headers: getAuthHeaders(oldToken, googleCookie),
  });
  const data: GetNewTokenResponse = await res.json();

  return data;
}
