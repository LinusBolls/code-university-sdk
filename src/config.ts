/** src: globally searching for `clientId` in the network tab on the learning platform */
const learningPlatformGoogleClientId =
  '358660676559-02rrefr671bdi1chqtd3l0c44mc8jt9p.apps.googleusercontent.com';

export const config = {
  graphqlBaseUrl: 'https://api.app.code.berlin/graphql',
  baseUrl: 'https://api.app.code.berlin',

  learningPlatformAccessTokenIssuer: 'code-intranet',
  learningPlatformAccessTokenAudience: 'coders',

  googleAccessTokenIssuer: 'https://accounts.google.com',
  googleAccessTokenAudience: learningPlatformGoogleClientId,

  learningPlatformGoogleClientId,

  learningPlatformAccessTokenExpirySeconds: 10 * 60,
  learningPlatformRefreshTokenExpirySeconds: 2 * 7 * 24 * 60 * 60,
};
