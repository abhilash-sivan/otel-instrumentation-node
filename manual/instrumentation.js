// Import the OpenTelemetry Node.js SDK
const { NodeSDK } = require('@opentelemetry/sdk-node');

// Import a span exporter to send trace data to the console (for debugging)
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');

// Import the `Resource` class, which defines metadata (e.g., service name, version)
const { Resource } = require('@opentelemetry/resources');

// Import auto-instrumentation utilities for automatic trace collection
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

// Create an instance of the OpenTelemetry Node.js SDK
const sdk = new NodeSDK({
  // Define resource attributes such as the service name and version
  resource: new Resource({
    'service.name': 'dice-server', // Name of the service being instrumented
    'service.version': '0.1.0', // Version of the service
  }),

  // Configure trace exporting to print spans to the console
  traceExporter: new ConsoleSpanExporter(),


  // Enable automatic instrumentation for common Node.js libraries (e.g., HTTP, Express, PostgreSQL)
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the OpenTelemetry SDK, initializing instrumentation and data collection
sdk.start();
