"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class RequestLoggerProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    const Config = this.app.use("Adonis/Src/Config");
    const RequestLogger = require("../src/RequestLogger");
    this.app.singleton("Adonis/Middleware/RequestLogger", () => {
      return new RequestLogger(Config);
    });
  }
}

module.exports = SentryProvider;
