# OpenTelemetry Instrumentation for Node.js

This project demonstrates how to instrument a simple Node.js application using OpenTelemetry for tracing and metrics collection. The application consists of an Express server that exposes an endpoint to simulate rolling a dice.

## Installation
Run the following command to install dependencies:
```sh
npm install --save @opentelemetry/api \
                 @opentelemetry/sdk-node \
                 @opentelemetry/sdk-trace-node \
                 @opentelemetry/sdk-metrics \
                 @opentelemetry/resources \
                 @opentelemetry/auto-instrumentations-node
```

## OpenTelemetry Instrumentation
### `instrumentation.js`
This file configures OpenTelemetry to automatically collect traces and metrics using console exporters.
```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  resource: new Resource({
    'service.name': 'dice-server',
    'service.version': '0.1.0',
  }),
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

## Express Application
### `index.js`
This is a simple Express server exposing a `/rolldice` endpoint that returns a random dice roll (1-6).
```javascript
const express = require('express');

const PORT = parseInt(process.env.PORT || '3001');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
```

## Running the Application
Use the following command to start the server with OpenTelemetry instrumentation:
```sh
node --require ./instrumentation.js index.js
```

## Viewing Traces and Metrics
Since we are using console exporters, traces and metrics will be logged directly to the terminal. You should see output similar to the following when requests are made:
```
Listening for requests on http://localhost:3001
Span { ...trace details... }
Metric { ...metric details... }
```

## Next Steps
- Integrate an OpenTelemetry backend (e.g., Jaeger, Prometheus) for better observability.
- Extend instrumentation to capture additional spans and custom metrics.

## References
- [OpenTelemetry for Node.js](https://opentelemetry.io/docs/languages/js/)

