# OpenTelemetry Zero-Code Instrumentation for Node.js

This repository demonstrates how to set up **zero-code instrumentation** using OpenTelemetry (OTel) for a simple Node.js application built with Express.

## Overview

- **Application**: An Express server with a single endpoint (`/rolldice`).
- **Instrumentation**: Automatically enabled using OpenTelemetry without modifying the application code.
- **Tracing Exporter**: Logs traces to the console.


## 🛠 **Setup and Installation**


### 2️⃣ **Install Dependencies**
Run the following commands to install the necessary dependencies:

```sh
npm install --save @opentelemetry/api   
npm install --save @opentelemetry/auto-instrumentations-node
npm install express
```

### 3️⃣ **Set Up OpenTelemetry Environment Variables**
Before running the application, set the **traces exporter** to log traces to the console:

```sh
export OTEL_TRACES_EXPORTER="console"
export OTEL_RESOURCE_ATTRIBUTES="service.name=express-app"
export OTEL_METRICS_EXPORTER="console"

```
reference: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/

### 4️⃣ **Run the Application with OpenTelemetry**

Start the Node.js application with OpenTelemetry auto-instrumentation:

```sh
node --require '@opentelemetry/auto-instrumentations-node/register' index.js
```

## 📊 **Expected OpenTelemetry data**

When you make a request to `http://localhost:3001/rolldice`, OpenTelemetry will log traces similar to the following:

```javascript
{
  "resource": {
    "attributes": {
      "service.name": "express-app",  // The name of the service being traced
      "telemetry.sdk.language": "nodejs",  // The language used for telemetry
      "telemetry.sdk.name": "opentelemetry",  // The name of the telemetry SDK
      "telemetry.sdk.version": "1.30.1",  // The version of OpenTelemetry SDK
      "host.name": "Aryas-MacBook-Pro.local",  // The hostname of the machine running the service
      "host.arch": "arm64",  // The system architecture
      "os.type": "darwin",  // The operating system type (macOS in this case)
      "os.version": "24.3.0",  // The version of the OS
      "service.instance.id": "60fbe44a-57a1-4794-937d-0505e50f5c44",  // Unique identifier for this instance of the service
      "process.pid": 64254,  // The process ID of the running application
      "process.executable.name": "node",  // The executable name
      "process.executable.path": ".nvm/versions/node/v20.6.1/bin/node",  // Path to the Node.js executable
      "process.command_args": [
        ".nvm/versions/node/v20.6.1/bin/node",
        "--require",
        "@opentelemetry/auto-instrumentations-node/register",
        "otel-app/auto/index.js"
      ],  // Command-line arguments used when starting the process
      "process.runtime.version": "20.6.1",  // The version of Node.js runtime
      "process.runtime.name": "nodejs",  // The runtime name
      "process.runtime.description": "Node.js",  // A description of the runtime
      "process.command": "otel-app/auto/index.js",  // The command that started the process
      "process.owner": "aryamohanan",  // The owner of the process
      "host.id": "xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx"  // Unique identifier for the host machine
    }
  },
  "instrumentationScope": {
    "name": "@opentelemetry/instrumentation-http",  // Indicates HTTP instrumentation is being used
    "version": "0.57.2",  // The version of the HTTP instrumentation package
    "schemaUrl": null  // No schema URL is provided
  },
  "traceId": "8209befe79cfd5cfc742c079000ecf7d",  // Unique trace identifier
  "parentId": null,  // No parent span (this is a root span)
  "traceState": null,  // No additional trace context
  "name": "GET /rolldice",  // The operation name (HTTP GET request to `/rolldice`)
  "id": "e107fb591c23df6f",  // Unique ID for this span
  "kind": 1,  // Indicates this is a SERVER span (1 = SERVER)
  "timestamp": 1742793460114000,  // Start time of the request (nanoseconds since epoch)
  "duration": 8011.625,  // Duration of the request in milliseconds (8 seconds)
  "attributes": {
    "http.url": "http://localhost:3002/rolldice",  // Full URL of the request
    "http.host": "localhost:3002",  // Hostname and port of the server
    "net.host.name": "localhost",  // Network hostname
    "http.method": "GET",  // HTTP method used
    "http.scheme": "http",  // HTTP scheme (http or https)
    "http.target": "/rolldice",  // The requested endpoint
    "http.user_agent": "Thunder Client (https://www.thunderclient.com)",  // The client making the request
    "http.flavor": "1.1",  // HTTP version used
    "net.transport": "ip_tcp",  // Transport protocol used (TCP)
    "net.host.ip": "::ffff:127.0.0.1",  // Server IP address
    "net.host.port": 3002,  // Port on which the server is running
    "net.peer.ip": "::ffff:127.0.0.1",  // IP address of the client making the request
    "net.peer.port": 50505,  // Port of the client making the request
    "http.status_code": 200,  // HTTP response status code
    "http.status_text": "OK",  // HTTP response status text
    "http.route": "/rolldice"  // Route pattern used for handling this request
  },
  "status": {
    "code": 0  // The status code indicating success (0 = OK)
  },
  "events": [],  // No recorded events in this span
  "links": []  // No linked spans
}

{
  "descriptor": {
    "name": "http.server.duration",  // Metric name for measuring request duration
    "type": "HISTOGRAM",  // Type of metric (Histogram for duration distribution)
    "description": "Measures the duration of inbound HTTP requests.",  // Description of the metric
    "unit": "ms",  // Unit of measurement (milliseconds)
    "valueType": 1,  // Type of value recorded (floating point)
    "advice": {}  // No additional advice provided
  },
  "dataPointType": 0,  // Indicates a histogram-type metric
  "dataPoints": [
    {
      "attributes": {
        "http.scheme": "http",  // HTTP scheme used
        "http.method": "GET",  // HTTP method
        "net.host.name": "localhost",  // Hostname of the server
        "http.flavor": "1.1",  // HTTP version
        "http.status_code": 200,  // HTTP response status code
        "net.host.port": 3002,  // Port the request was received on
        "http.route": "/rolldice"  // The route that handled the request
      },
      "startTime": [ 1742793460, 122000000 ],  // Start time in epoch format (seconds, nanoseconds)
      "endTime": [ 1742793516, 607000000 ],  // End time in epoch format (seconds, nanoseconds)
      "value": {
        "min": 8.389417,  // Minimum recorded duration of requests in milliseconds
        "max": 8.389417,  // Maximum recorded duration of requests in milliseconds
        "sum": 8.389417,  // Total sum of durations recorded
        "buckets": {
          "boundaries": [
            0, 5, 10, 25,
            50, 75, 100, 250,
            500, 750, 1000, 2500,
            5000, 7500, 10000
          ],  // Bucket boundaries for the histogram
          "counts": [
            0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0
          ]  // Number of requests that fall into each bucket
        },
        "count": 1  // Total number of requests recorded
      }
    }
  ]
}

```

## 📖 **References**
- OpenTelemetry Node.js: [https://opentelemetry.io/docs/instrumentation/js/getting-started/](https://opentelemetry.io/docs/instrumentation/js/getting-started/)
- Express.js: [https://expressjs.com/](https://expressjs.com/)
- [Env variables](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/)
