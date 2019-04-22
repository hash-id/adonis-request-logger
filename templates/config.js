"use strict";

/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
|
| Please save inside config/requestLogger.js file.
|
|
*/

const Env = use("Env");

module.exports = {
  /**
   * list of HTTP codes that considered as normal, thus logged with Logger.info instead of Logger.warning
   */
  normalCode: ["200", "201", "202", "301", "302", "303", "304"],
  /**
   * exclude following routes from being logged
   */
  exclude: ["/assets/*"]
};
