import { describe, expect, it, vitest } from 'vitest';

import { LearningPlatformClient } from '../../../src';
import { MockLPAccessToken } from '../../util/accessTokens';
import { mockFetch } from '../../util/fetch';
import { MockLPRefreshToken } from '../../util/refreshTokens';

describe('LearningPlatformClient (integration)', () => {
  it('fetches an access token', async () => {
    const fetchImpl = vitest.fn(mockFetch);
    const newLearningPlatform = await LearningPlatformClient.fromRefreshToken(
      MockLPRefreshToken.freshValid,
      { fetch: fetchImpl }
    );
    const settings = await newLearningPlatform.getOwnSettings();
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      'https://api.app.code.berlin/cid_refresh',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Cookie: 'cid=' + MockLPRefreshToken.freshValid,
        },
      })
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      'https://api.app.code.berlin/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + MockLPAccessToken.freshValid,
          Cookie: 'cid=' + MockLPRefreshToken.freshValid,
        },
      })
    );
    expect(settings).toHaveProperty('mySettings');
    expect(settings.mySettings).toHaveProperty('id');
  });
});
