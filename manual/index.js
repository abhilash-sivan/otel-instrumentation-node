const { trace, SpanKind } = require('@opentelemetry/api');

// Create a tracer instance
const name = 'rolldice-logic';
const version = '0.1.0';
const tracer = trace.getTracer(name, version);

const express = require('express');

const PORT = parseInt(process.env.PORT || '3001');
const app = express();


function getRandomNumber(min, max) {
  // Start a new span to trace the function execution
  const span = tracer.startSpan('getRandomNumber', {
    kind: SpanKind.INTERNAL,
    attributes: { 'dice.min': min, 'dice.max': max },
  });

  try {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } finally {
    span.end(); // Ensure the span is closed
  }
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
