import { describe, it, expect, vitest } from 'vitest';

import { LearningPlatformClient } from '../../../src';
import { MockLPAccessToken } from '../../util/jwt';
import { mockFetch } from '../../util/fetch';

describe('LearningPlatformClient (integration)', () => {
  it("automatically refreshes the token it was initialized with if it's expired", async () => {
    const fetchImpl = vitest.fn(mockFetch);

    const newLearningPlatform = await LearningPlatformClient.fromAccessToken(
      MockLPAccessToken.expiredValid,
      { fetch: fetchImpl }
    );
    const settings = await newLearningPlatform.getOwnSettings();

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      'https://api.app.code.berlin/cid_refresh',
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      'https://api.app.code.berlin/graphql',
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(settings).toHaveProperty('mySettings');
    expect(settings.mySettings).toHaveProperty('id');
  });

  it("doesn't refresh the token it was initialized with if it's not expired", async () => {
    const fetchImpl = vitest.fn(mockFetch);

    const newLearningPlatform = await LearningPlatformClient.fromAccessToken(
      MockLPAccessToken.freshValid,
      { fetch: fetchImpl }
    );
    const settings = await newLearningPlatform.getOwnSettings();

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      'https://api.app.code.berlin/graphql',
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(settings).toHaveProperty('mySettings');
    expect(settings.mySettings).toHaveProperty('id');
  });
});
