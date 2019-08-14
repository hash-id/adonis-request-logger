const Logger = use("Logger");
const prettyMs = require("pretty-ms");
const util = require("util");
const serializeError = require("serialize-error");

class RequestLogger {
  constructor(config) {
    this._normalCode = config.get("requestLogger.normalCode", [200]);
    this._reqHeaders = config.get("requestLogger.requestHeaders", []);
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // basic info
    const reqLabel = Date.now()
      .toString(32)
      .toUpperCase();
    const url = request.url();
    const method = request.method();
    const ip = request.ip();
    const beginTime = process.hrtime();
    // grab headers
    const headers = this._reqHeaders.reduce((collection, headerName) => {
      collection[headerName] = request.header(headerName);
      return collection;
    }, {});
    // log incoming
    Logger.info(`${reqLabel} <-- ${method} ${url} ${ip}`, {
      headers,
      postBody: request.post()
    });
    // await for request handling to be done
    await next();
    // request handled
    // listen on finish event
    response.response.on("finish", () => {
      // calc diffTIme in ms
      const diffTime = process.hrtime(beginTime);
      const elapsedMs = prettyMs((diffTime[0] * 1e9 + diffTime[1]) / 1e6);
      const statusCode = response.response.statusCode;
      const { content } = response.lazyBody;
      const isContentObject = typeof content === "object" && content !== null;
      const isContentError =
        content instanceof Error ||
        (isContentObject && content.errno && content.syscall);
      // select logger
      let loggerMethod = Logger.info;
      /// if statusCode is NOT Normal
      if (this._normalCode.includes(statusCode) === false || isContentError)
        loggerMethod = Logger.warning;
      //// write logger
      if (isContentObject) {
        loggerMethod(
          `${reqLabel} --> ${method} ${url} -- [${statusCode}] in ${elapsedMs}`,
          content
        );
      } else {
        loggerMethod(
          `${reqLabel} --> ${method} ${url} -- [${statusCode}] in ${elapsedMs}`
        );
      }
    });
  }
}

module.exports = RequestLogger;
