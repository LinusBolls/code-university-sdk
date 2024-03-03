import { describe, it, expect, beforeAll } from 'vitest';

import { LearningPlatformClient, LearningPlatformClientType } from '../../src';

const accessToken = process.env.LEARNING_PLATFORM_ACCESS_TOKEN!;
const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN!;

if (!accessToken) {
  throw new Error(
    'Env: LEARNING_PLATFORM_ACCESS_TOKEN not found. Please provide this value in .env.testing'
  );
}
if (!googleAccessToken) {
  console.warn(
    'Env: GOOGLE_ACCESS_TOKEN not found. Provide this value in .env.testing to test the LearningPlatformClient.fromGoogleAccessToken method.'
  );
}

describe('LearningPlatformClient (e2e)', () => {
  let learningPlatform: LearningPlatformClientType;

  beforeAll(async () => {
    learningPlatform =
      await LearningPlatformClient.fromAccessToken(accessToken);
  });

  it('authenticates with fromAccessToken', async () => {
    const newLearningPlatform =
      await LearningPlatformClient.fromAccessToken(accessToken);
    const settings = await newLearningPlatform.getOwnSettings();

    expect(settings).toHaveProperty('mySettings');
    expect(settings.mySettings).toHaveProperty('id');
  });

  if (googleAccessToken) {
    it('authenticates with fromGoogleAccessToken', async () => {
      const newLearningPlatform =
        await LearningPlatformClient.fromGoogleAccessToken(googleAccessToken);
      const settings = await newLearningPlatform.getOwnSettings();

      expect(settings).toHaveProperty('mySettings');
      expect(settings.mySettings).toHaveProperty('id');
    });
  }

  it('getUnderMaintanance method', async () => {
    const underMaintanance = await learningPlatform.getUnderMaintanance();

    expect(underMaintanance).toHaveProperty('underMaintanance');
  });

  it('getEventGroups method', async () => {
    const eventGroups = await learningPlatform.getEventGroups();

    expect(eventGroups).toHaveProperty('eventGroups');
  });

  it('getUpcomingEvents method', async () => {
    const upcomingEvents = await learningPlatform.getUpcomingEvents();

    expect(upcomingEvents).toHaveProperty('upcomingEvents');
  });

  it('getMyUpcomingAssessments method', async () => {
    const myUpcomingAssessments =
      await learningPlatform.getMyUpcomingAssessments();

    expect(myUpcomingAssessments).toHaveProperty('myUpcomingAssessments');
  });

  it('getMyNotifications method', async () => {
    const myNotifications = await learningPlatform.getMyNotifications();

    expect(myNotifications).toHaveProperty('myNotifications');
  });
  it('makes raw queries', async () => {
    const myNotifications = await learningPlatform.raw.query<'myNotifications'>`
    query {
        myNotifications {
        title
        label
        link
        read
        urgency
        createdAt
        }
    }`;
    // make sure the return type gets inferred correctly
    myNotifications satisfies { myNotifications: { title: string }[] };

    // @ts-expect-error assert non-existant property "foo" get flagged by the linter
    myNotifications satisfies { myNotifications: { foo: string }[] };

    // @ts-expect-error assert non-existant query "foo" get flagged by the linter
    learningPlatform.raw.query<'foo'>('');

    expect(myNotifications).toHaveProperty('myNotifications');
  });
});
