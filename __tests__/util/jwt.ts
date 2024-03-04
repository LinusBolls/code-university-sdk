import * as jwt from 'jsonwebtoken';

const freshValid = jwt.sign(
  {
    userId: 'mocked',
    tokenVersion: 1,
    iat: Math.floor(Date.now() / 1000) - 90,
    // expires in 30 seconds
    exp: Math.floor(Date.now() / 1000) + 30,
    aud: 'coders',
    iss: 'code-intranet',
  },
  'testSecret'
);
const expiredValid = jwt.sign(
  {
    userId: 'mocked',
    tokenVersion: 1,
    iat: Math.floor(Date.now() / 1000) - 90,
    // expired 30 seconds ago
    exp: Math.floor(Date.now() / 1000) - 30,
    aud: 'coders',
    iss: 'code-intranet',
  },
  'testSecret'
);
const freshInvalidAud = jwt.sign(
  {
    userId: 'mocked',
    tokenVersion: 1,
    iat: Math.floor(Date.now() / 1000) - 90,
    // expires in 30 seconds
    exp: Math.floor(Date.now() / 1000) + 30,
    aud: 'some-invalid-audience',
    iss: 'code-intranet',
  },
  'testSecret'
);

const freshInvalidIss = jwt.sign(
  {
    userId: 'mocked',
    tokenVersion: 1,
    iat: Math.floor(Date.now() / 1000) - 90,
    // expires in 30 seconds
    exp: Math.floor(Date.now() / 1000) + 30,
    aud: 'coders',
    iss: 'some-invalid-issuer',
  },
  'testSecret'
);

export const MockLPAccessToken = {
  freshValid,
  expiredValid,
  freshInvalidAud,
  freshInvalidIss,
};
