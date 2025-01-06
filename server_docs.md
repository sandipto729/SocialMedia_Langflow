# Proxy Backend for Langflow API

This project provides a proxy backend that connects the client to the Langflow API. It serves as an intermediary to facilitate communication between the WebSocket-based client and the Langflow API, handling requests and streaming responses efficiently.

## Features

- Establishes WebSocket connections with clients.
- Proxies client requests to the Langflow API.
- Streams real-time responses back to the client.
- Handles errors gracefully.
- Uses `express` for API endpoints and `ws` for WebSocket connections.
- Configurable via environment variables.

## Prerequisites

Ensure you have the following installed:

- Node.js (v22 or later)
- npm (Node Package Manager)
- A Langflow API endpoint and authorization token

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/proxy-backend-langflow.git
   cd proxy-backend-langflow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```plaintext
   APPLICATION_TOKEN=your_langflow_api_token
   PORT=3000
   ```

## Code Overview

### Server Setup

The server is built using `express` for HTTP endpoints and `ws` for WebSocket support.

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
```

### WebSocket Handling

Each WebSocket connection is assigned a unique `requestId` for tracking and communication.

```javascript
const connections = new Map();

wss.on('connection', (ws) => {
    const requestId = Math.random().toString(36).substring(7);
    connections.set(requestId, ws);

    ws.on('close', () => {
        connections.delete(requestId);
    });

    ws.send(JSON.stringify({ type: 'requestId', requestId }));
});
```

### API Endpoints

#### Root Endpoint

Provides a basic health check for the server.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

#### Chat Endpoint

Handles requests from clients, forwards them to the Langflow API, and streams responses.

```javascript
app.post('/chat', async (req, res) => {
    const { input_value, requestId } = req.body;
    const ws = connections.get(requestId);

    if (!ws) {
        return res.status(400).json({ error: 'WebSocket connection not found' });
    }

    try {
        const response = await axios.post(
            'https://api.langflow.astra.datastax.com/lf/<path>/api/v1/run/<path>?stream=false',
            {
                input_value,
                output_type: 'chat',
                input_type: 'chat',
                tweaks: {
                    // Your tweaks here
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.APPLICATION_TOKEN}`
                }
            }
        );

        const message = response.data.outputs[0].outputs[0].results.message.text;
        ws.send(JSON.stringify({ type: 'response', message }));
        res.json({ status: 'Processing' });
    } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: error.message }));
        res.status(500).json({ error: error.message });
    }
});
```

### Start the Server

The server listens on the port specified in the `.env` file or defaults to `3000`.

```javascript
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

2. Establish a WebSocket connection to the server:

   ```javascript
   const ws = new WebSocket('ws://<server-ip>:3000');

   ws.onmessage = (event) => {
       const data = JSON.parse(event.data);
       console.log(data);
   };
   ```

3. Send chat requests via the `/chat` endpoint:

   ```bash
   curl -X POST http://<server-ip>:3000/chat \
   -H 'Content-Type: application/json' \
   -d '{"input_value": "Hello", "requestId": "your_request_id"}'
   ```

## Design Workflow

1. **Client Connection:**
   - The client connects via WebSocket to the server and receives a unique `requestId`.

2. **Request Handling:**
   - The client sends a POST request with `input_value` and `requestId` to the `/chat` endpoint.

3. **Proxy Forwarding:**
   - The server forwards the request to the Langflow API with necessary headers and payload.

4. **Response Streaming:**
   - The server receives a response from the Langflow API and streams it back to the client using WebSocket.

5. **Error Management:**
   - Errors are caught and relayed to the client via WebSocket and HTTP responses.

## Environment Variables

- `APPLICATION_TOKEN`: Authorization token for Langflow API.
- `PORT`: Port to run the server (default: 3000).

## Dependencies

- `express`
- `ws`
- `axios`
- `cors`
- `dotenv`

Install them using:

```bash
npm install express ws axios cors dotenv
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
