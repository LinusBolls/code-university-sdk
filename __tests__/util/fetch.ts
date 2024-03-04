import { MockLPAccessToken } from './jwt';

const majorNodeVersion = parseInt(
  process.version.match(/^v(\d+).\d+.\d+$/)?.[1] || 'NaN'
);

if (typeof fetch === 'undefined' || typeof Headers === 'undefined') {
  if (majorNodeVersion <= 16) {
    throw new Error(
      `global fetch is not defined, but required for e2e tests. please upgrade to nodejs version v18.0.0 or newer, where fetch is natively supported. your current version is ${process.version}.`
    );
  } else {
    throw new Error('global fetch is not defined, but required for e2e tests.');
  }
}

const createFetchJsonResponse = (data: unknown) => {
  return {
    text: () => new Promise((res) => res(JSON.stringify(data))),
    json: () => new Promise((res) => res(data)),
    headers: new Headers({ 'content-type': 'application/json' }),
    ok: true,
  };
};

export const mockFetch = ((url: string, options?: RequestInit) => {
  const body = JSON.parse(options?.body?.toString() || 'null');

  if (url === 'https://api.app.code.berlin/cid_refresh') {
    return createFetchJsonResponse({
      ok: true,
      token: MockLPAccessToken.freshValid,
    });
  }

  if (
    body?.query?.startsWith('\n  mutation googleSignin($code: String!) {\n')
  ) {
    return createFetchJsonResponse({
      ok: true,
      token: MockLPAccessToken.freshValid,
    });
  }

  if (body?.query?.startsWith('\n  query {\n    mySettings {\n')) {
    return createFetchJsonResponse({
      data: { mySettings: { id: 'mocked' } },
    });
  }
  return fetch(url, options);
}) as typeof fetch;
