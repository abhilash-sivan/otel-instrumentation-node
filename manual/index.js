const {
  trace,
  SpanKind,
  context,
  propagation,
  metrics,
  baggage,
} = require('@opentelemetry/api');

// Create a tracer instance
const name = 'rolldice-logic';
const version = '0.1.0';
// const tracer = trace.getTracer(name, version);

// Tracer and meter setup
const tracer = trace.getTracer(name, version);
const meter = metrics.getMeter('rolldice-logic');

// Histogram metric for HTTP request duration
const histogram = meter.createHistogram('http.server.duration', {
  description: 'Measures HTTP request durations',
});

const express = require('express');

const PORT = parseInt(process.env.PORT || '3001');
const app = express();

// Middleware to measure HTTP latency
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    histogram.record(duration, {
      route: req.path || 'unknown',
      method: req.method,
      status_code: res.statusCode,
    });
  });
  next();
});

// Set up baggage
const myBaggage = propagation.createBaggage({
  'user-id': { value: '12345' },
});

const ctxWithBaggage = propagation.setBaggage(context.active(), myBaggage);

// SPAN LINKS
const span1 = tracer.startSpan('operation-A');

span1.end();

function getRandomNumber(min, max) {
  // Start a new span to trace the function execution
  const span = tracer.startSpan(
    'getRandomNumber',
    {
      kind: SpanKind.INTERNAL,
      attributes: { 'dice.min': min, 'dice.max': max },
      links: [{ context: span1.spanContext() }],
    },
    ctxWithBaggage
  );
  span.addEvent('Doing something in getRandomNumber fn');
  try {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } finally {
    span.end(); // Ensure the span is closed
    // span1.end();
    // Extract baggage later in your app
    const currentBaggage = propagation.getBaggage(ctxWithBaggage);
    console.log('Baggage user-id:', currentBaggage?.getEntry('user-id')?.value);
  }
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
