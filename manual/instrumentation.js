// Import the OpenTelemetry Node.js SDK
const { NodeSDK } = require('@opentelemetry/sdk-node');

// Import a span exporter to send trace,metrics data to the console (for debugging)
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  MeterProvider,
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
// Import the `Resource` class, which defines metadata (e.g., service name, version)
const { Resource } = require('@opentelemetry/resources');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { metrics } = require('@opentelemetry/api'); // Import global metrics API

// Define a resource with metadata like service name and version
const resource = new Resource({
  'service.name': 'dice-server',
  'service.version': '0.1.0',
});

// Set up the MetricReader to export metrics periodically
const metricReader = new PeriodicExportingMetricReader({
  exporter: new ConsoleMetricExporter(),
  exportIntervalMillis: 10000, // Export every 10 seconds
});

// Set up a MeterProvider for exporting metrics
const meterProvider = new MeterProvider({
  resource,
  readers: [metricReader],
});

//  **Register the MeterProvider globally**
metrics.setGlobalMeterProvider(meterProvider);

// Create an OpenTelemetry SDK instance with automatic instrumentation
const sdk = new NodeSDK({
  resource,
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start OpenTelemetry SDK
sdk.start()