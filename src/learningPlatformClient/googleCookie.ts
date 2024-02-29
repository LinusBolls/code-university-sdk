import { config } from '../config';

const getJwtString = (googleCookie: string): string | null => {
  return googleCookie.match(/cid=(.*)$/)?.[1];
};

const parseJwtString = <T>(token: string): T | null => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }
  const [header, payload, signature] = parts;

  const decodedPayload = decodeBase64Url(payload);

  try {
    return JSON.parse(decodedPayload);
  } catch (err) {
    return null;
  }
};

const decodeBase64Url = (base64UrlString: string): string => {
  // Replace URL-safe characters with their base64 equivalents
  const base64 = base64UrlString.replace(/-/g, '+').replace(/_/g, '/');
  // Pad the base64 string if necessary
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '='
  );
  // Decode the base64 string
  const decoded = Buffer.from(paddedBase64, 'base64').toString('utf-8');

  return decoded;
};

export interface GoogleCookiePayload {
  /** e.g. `cksn66uwl47500wlcrpg94tok` */
  userId: string;
  tokenVersion: number;
  /** 10-digit unix timestamp */
  iat: number;
  /** 10-digit unix timestamp */
  exp: number;
  /** should be `coders` */
  aud: 'coders';
  /** should be `code-intranet` */
  iss: 'code-intranet';
}

export const assertGoogleCookieWasIssuedForLearningPlatform = (
  googleCookie: string
) => {
  const payload = parseJwtString<GoogleCookiePayload>(
    getJwtString(googleCookie)
  );
  if (!payload) {
    throw new Error(
      'CodeUniversity.LearningPlatformClient.Init: Invalid Google cookie'
    );
  }
  if (
    payload.aud !== config.googleAudience ||
    payload.iss !== config.googleIssuer
  ) {
    throw new Error(
      "CodeUniversity.LearningPlatformClient.Init: Google cookie wasn't issued to the CODE Learning Platform"
    );
  }
  return payload;
};
