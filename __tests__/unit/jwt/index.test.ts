import { describe, expect, it } from 'vitest';

import { assertLearningPlatformRefreshToken } from '../../../src/learningPlatformClient/jwt';
import { MockLPRefreshToken } from '../../util/refreshTokens';

describe('assertLearningPlatformRefreshToken (unit)', async () => {
  it('parses the payload of a fresh valid token', async () => {
    const payload = assertLearningPlatformRefreshToken(
      MockLPRefreshToken.freshValid
    );
    expect(payload).toStrictEqual({
      userId: 'mocked',
      tokenVersion: 1,
      iat: Math.floor(Date.now() / 1000) - 90,
      exp: Math.floor(Date.now() / 1000) + 30,
      aud: 'coders',
      iss: 'code-intranet',
    });
  });

  it('throws if the token audience is not "coders"', async () => {
    expect(() => {
      assertLearningPlatformRefreshToken(MockLPRefreshToken.freshInvalidAud);
    }).toThrow();
  });

  it('throws if the token issuer is not "code-intranet"', async () => {
    expect(() => {
      assertLearningPlatformRefreshToken(MockLPRefreshToken.freshInvalidIss);
    }).toThrow();
  });
});
