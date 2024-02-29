import { describe, it, expect } from "vitest";

import { LearningPlatformClient } from "~";

const googleCookie = process.env.GOOGLE_COOKIE!;

if (!process.env.GOOGLE_COOKIE) {
    throw new Error("Env: GOOGLE_COOKIE not found. Please provide this value in .env.testing");
}

describe("LearningPlatformClient (e2e)", () => {

    it("authenticates", async () => {

        const learningPlatform = await LearningPlatformClient.fromGoogleCookie(
            googleCookie
          );
          const settings = await learningPlatform.getOwnSettings();

          expect(settings).toHaveProperty('mySettings');
          expect(settings.mySettings).toHaveProperty('id');
    });
    it("getEventGroups method", async () => {

        const learningPlatform = await LearningPlatformClient.fromGoogleCookie(
            googleCookie
          );
          const eventGroups = await learningPlatform.getEventGroups();

          expect(eventGroups).toHaveProperty('eventGroups');

          console.log(eventGroups.eventGroups)
    });

    it("getUpcomingEvents method", async () => {

        const learningPlatform = await LearningPlatformClient.fromGoogleCookie(
            googleCookie
          );
          const upcomingEvents = await learningPlatform.getUpcomingEvents();

          expect(upcomingEvents).toHaveProperty('upcomingEvents');

          console.log(upcomingEvents.upcomingEvents)
    });
});