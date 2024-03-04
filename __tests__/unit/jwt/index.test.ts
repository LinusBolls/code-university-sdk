import { describe, it, expect } from 'vitest';

import { assertLearningPlatformAccessToken } from '../../../src/learningPlatformClient/jwt';
import { MockLPAccessToken } from '../../util/jwt';

describe('assertLearningPlatformAccessToken (unit)', async () => {
  it('parses the payload of a fresh valid token', async () => {
    const payload = assertLearningPlatformAccessToken(
      MockLPAccessToken.freshValid
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

  it('parses the payload of an expired valid token', async () => {
    const payload = assertLearningPlatformAccessToken(
      MockLPAccessToken.expiredValid
    );
    expect(payload).toStrictEqual({
      userId: 'mocked',
      tokenVersion: 1,
      iat: Math.floor(Date.now() / 1000) - 90,
      exp: Math.floor(Date.now() / 1000) - 30,
      aud: 'coders',
      iss: 'code-intranet',
    });
  });

  it('throws if the token audience is not "coders"', async () => {
    expect(() => {
      assertLearningPlatformAccessToken(MockLPAccessToken.freshInvalidAud);
    }).toThrow();
  });

  it('throws if the token issuer is not "code-intranet"', async () => {
    expect(() => {
      assertLearningPlatformAccessToken(MockLPAccessToken.freshInvalidIss);
    }).toThrow();
  });
});
