import { config } from '../config';

export const parseJwt = <Payload extends JwtPayload>(
  token: unknown
): Payload | null => {
  if (typeof token !== 'string') {
    return null;
  }
  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      return null;
    }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [header, payload, signature] = parts;

    const decodedPayload = base64decode(payload);

    const payloadData: Payload = JSON.parse(decodedPayload);

    return payloadData;
  } catch (err) {
    return null;
  }
};

const base64decode = (base64String: string): string => {
  // Replace URL-safe characters with their base64 equivalents
  const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
  // Pad the base64 string if necessary
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '='
  );
  const decoded = Buffer.from(paddedBase64, 'base64').toString('utf-8');

  return decoded;
};

export interface JwtPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
}

const assertJwt = <Payload extends JwtPayload>(
  token: unknown,
  iss?: string,
  aud?: string,
  validateExpiry = true
): Payload => {
  const payload = parseJwt<Payload>(token);

  if (!payload) {
    throw new Error('CodeUniversity.assertJwt: Failed to parse token as jwt');
  }
  const isExpired = (payload.exp ?? 0) < Date.now() / 1000;

  if (isExpired && validateExpiry) {
    throw new Error('CodeUniversity.assertJwt: Expired token');
  }

  if (payload.iss !== iss || payload.aud !== aud) {
    throw new Error(
      `CodeUniversity.assertJwt: Invalid token payload: must include ${JSON.stringify({ iss, aud })}, but got ${JSON.stringify(payload)}`
    );
  }
  return payload;
};

export interface LearningPlatformRefreshTokenPayload extends JwtPayload {
  /** e.g. `cksn66uwl47500wlcrpg94tok` */
  userId: string;
  /** should be `1` */
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

export interface LearningPlatformAccessTokenPayload extends JwtPayload {
  /** e.g. `cksn66uwl47500wlcrpg94tok` */
  userId: string;
  /** e.g. `linus.bolls@code.berlin` */
  email: string;
  /** 10-digit unix timestamp */
  iat: number;
  /** 10-digit unix timestamp */
  exp: number;
  /** should be `coders` */
  aud: 'coders';
  /** should be `code-intranet` */
  iss: 'code-intranet';
}

const isAccessToken = (
  payload:
    | LearningPlatformAccessTokenPayload
    | LearningPlatformRefreshTokenPayload
): payload is LearningPlatformAccessTokenPayload => {
  return 'email' in payload;
};

const isRefreshToken = (
  payload:
    | LearningPlatformAccessTokenPayload
    | LearningPlatformRefreshTokenPayload
): payload is LearningPlatformAccessTokenPayload => {
  return 'tokenVersion' in payload;
};

export const assertLearningPlatformAccessToken = (token: unknown) => {
  const payload = assertJwt<
    LearningPlatformAccessTokenPayload | LearningPlatformRefreshTokenPayload
  >(
    token,
    config.learningPlatformAccessTokenIssuer,
    config.learningPlatformAccessTokenAudience
  );
  if (!isAccessToken(payload)) {
    const type = isRefreshToken(payload) ? 'refresh token' : 'unknown token';

    throw new Error(
      `CodeUniversity.assertLearningPlatformAccessToken: Invalid token payload: expected access token, but got ${type}: ` +
        JSON.stringify(payload)
    );
  }
  return payload;
};

export const assertLearningPlatformRefreshToken = (token: unknown) => {
  const payload = assertJwt<
    LearningPlatformAccessTokenPayload | LearningPlatformRefreshTokenPayload
  >(
    token,
    config.learningPlatformAccessTokenIssuer,
    config.learningPlatformAccessTokenAudience
  );
  if (!isRefreshToken(payload)) {
    const type = isAccessToken(payload) ? 'access token' : 'unknown token';

    throw new Error(
      `CodeUniversity.assertLearningPlatformRefreshToken: Invalid token payload: expected refresh token, but got ${type}: ` +
        JSON.stringify(payload)
    );
  }
  return payload;
};

export interface GoogleAccessTokenPayload extends JwtPayload {
  iss: 'https://accounts.google.com';
  /** should match config.learningPlatformGoogleClientId` */
  azp: '358660676559-02rrefr671bdi1chqtd3l0c44mc8jt9p.apps.googleusercontent.com';
  /** should match `config.learningPlatformGoogleClientId` */
  aud: '358660676559-02rrefr671bdi1chqtd3l0c44mc8jt9p.apps.googleusercontent.com';
  sub: '103279379302325209431';
  hd: 'code.berlin';
  /** e.g. `linus.bolls@code.berlin` */
  email: string;
  email_verified: boolean;
  /** 10-digit unix timestamp */
  nbf: number;
  /** e.g. `Linus Bolls` */
  name: string;
  /** a url */
  picture: string | null;
  /** e.g. `Linus` */
  given_name: 'Linus';
  /** e.g. `Bolls` */
  family_name: 'Bolls';
  locale: 'en';
  /** 10-digit unix timestamp */
  iat: number;
  /** 10-digit unix timestamp */
  exp: number;
  jti: 'f2cb737a512859413903508b8468af8851283b85';
}

export const assertGoogleAccessToken = (accessToken: unknown) => {
  return assertJwt<LearningPlatformAccessTokenPayload>(
    accessToken,
    config.googleAccessTokenIssuer,
    config.googleAccessTokenAudience
  );
};
