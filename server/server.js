const dotenv=require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const cors = require('cors');
// const connectDB = require('./config/db.js');
const connectAstraDB=require('./config/astraDb.js');
const routes=require('./routes/index.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.Frontend_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(cors({
    origin: process.env.Frontend_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

// connectDB();
connectAstraDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', routes);

const connections = new Map();

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    const requestId = Math.random().toString(36).substring(7);
    connections.set(requestId, socket);
    console.log(`Request ID generated: ${requestId}`);
    
    socket.emit('requestId', { requestId });

    socket.on('disconnect', () => {
        console.log(`Disconnect: ${socket.id}`);
        connections.forEach((connSocket, id) => {
            if (connSocket === socket) {
                connections.delete(id);
                console.log(`Removed connection for requestId: ${id}`);
            }
        });
    });
});


app.post('/chat', async (req, res) => {
    console.log('Received request:', req.body); // Check the incoming data
    const { input_value, requestId } = req.body;
    const socket = connections.get(requestId);

    if (!socket) {
        return res.status(400).json({ error: 'Socket connection not found' });
    }

    try {
        const response = await axios.post(
            'https://api.langflow.astra.datastax.com/lf/b24f844e-54ee-4517-8e48-e324edd6c627/api/v1/run/d72d82b4-1783-4b1d-9e70-d5bff0b3f1bf?stream=false',
            {
                input_value,
                output_type: 'chat',
                input_type: 'chat',
                tweaks: {
                    "ParseData-bU2Lk": {},
                    "SplitText-s45X9": {},
                    "OpenAIModel-Bunci": {},
                    "ChatOutput-8sI0F": {},
                    "AstraDB-66x6b": {},
                    "File-j3YRd": {},
                    "ChatInput-iAwEu": {},
                    "CombineText-1kBZ6": {},
                    "TextInput-upHmt": {}
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.APPLICATION_TOKEN}`
                }
            }
        );
        console.log('API response:', response.data); // Check the response from the API
        const message = response.data.outputs[0].outputs[0].results.message.text;
        socket.emit('response', { message });
        res.json({ status: 'Processing' });
    } catch (error) {
        console.error('Error processing request:', error); // Check the error
        socket.emit('error', { message: error.message });
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
