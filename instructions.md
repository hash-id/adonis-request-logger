## Registering provider

Make sure you register the provider inside `start/app.js` file.

```js
const providers = ["adonis-request-logger/providers/RequestLoggerProvider"];
```

After that enable the logger middleware inside `start/kernel.js` file.

```javascript
const globalMiddleware = {
  ...,
  'Adonis/Middleware/RequestLogger'
}
```

## Usage

All request and response will be logged, as seen in your console.
You can exclude certain url route or mark several http codes as normal by adjusting the configuration in `config/requestLogger.js`
