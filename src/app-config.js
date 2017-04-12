/**
 * Constants object for the application.
 * @module app-config
 */

export default Object.freeze({
  // API base url
  REST_URL: process.env.NG_SEED_API_URL,

  // Save the environment
  ENV: process.env.NODE_ENV
})
