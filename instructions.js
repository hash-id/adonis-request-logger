"use strict";

/*
 * adonis-request-logger
 *
 * (c) Hash Rekayasa Teknologi
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require("path");

module.exports = async cli => {
  try {
    const fromPath = path.join(__dirname, "templates/config.js");
    const toPath = path.join(cli.helpers.configPath(), "requestLogger.js");
    await cli.copy(fromPath, toPath);
    cli.command.completed("create", "config/requestLogger.js");
  } catch (error) {
    cli.command.info("config/requestLogger.js already exists.");
  }
};
