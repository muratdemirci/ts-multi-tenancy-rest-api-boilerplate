// API URL BASE PATH (e.g. /api)
const basePath = '/api';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '720h',
    accessTokenExpiry: '720h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'follow-deusmur',
  },
  authorizationIgnorePath: ['/', '/auth/sign-in', '/auth/sign-up', '/auth/is-authenticated'],
};
