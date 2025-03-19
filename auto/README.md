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
  resource: {
    attributes: {
      'service.name': 'express-app',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'host.name': 'your-machine.local',
      'process.pid': 12345,
       'process.command_args': [
        '/Users/aryamohanan/.nvm/versions/node/v20.6.1/bin/node',
        '--require',
        '@opentelemetry/auto-instrumentations-node/register',
        '/Users/aryamohanan/Desktop/code/otel-app/auto/index.js'
      ],
      'process.runtime.version': '20.6.1',
      'process.runtime.name': 'nodejs',
      'process.runtime.description': 'Node.js',
    }
  },
instrumentationScope: {
    name: '@opentelemetry/instrumentation-express',
    version: '0.47.1',
    schemaUrl: undefined
  },
  traceId: 'f6da29fdabb40d11fdc08b4121c66aef',
  parentId: 'ddaf8446d5b137f7',
  traceState: undefined,
  name: 'request handler - /rolldice',
  id: '5cf7df6296aa59eb',
  kind: 0,
  timestamp: 1742189783553000,
  duration: 31.583,
  attributes: {
    'http.route': '/rolldice',
    'express.name': '/rolldice',
    'express.type': 'request_handler'
  },
  status: { code: 0 },
  events: [],
  links: []
}
```

## 📖 **References**
- OpenTelemetry Node.js: [https://opentelemetry.io/docs/instrumentation/js/getting-started/](https://opentelemetry.io/docs/instrumentation/js/getting-started/)
- Express.js: [https://expressjs.com/](https://expressjs.com/)
- [Env variables](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/)
