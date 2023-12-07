const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const path = require("path");
const db = require('./mongo');
const port = 3000;

const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create an HTTP server
const server = http.createServer(app);

/* MQTT */

// MQTT broker URL
const brokerUrl = 'mqtt://127.0.0.1:1883';

// Creating MQTT client instance
const client = mqtt.connect(brokerUrl);

// Handling mqtt events
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to the topic
    client.subscribe('controller/status', (err) => {
        if (!err) {
            console.log('Subscribed to controller/status');
        }
    });
});

// Handling connections errors
const maxRetries = 3; // Maximum retry attempts
let retryCount = 0;
client.on('error', (error) => {
    console.error('MQTT Error:', error.message);

    if (retryCount < maxRetries) {
        // Retry the connection after a delay
        setTimeout(() => {
            console.log('Retrying MQTT connection...');
            client.reconnect();
        }, 2000);

        retryCount++;
    } else {
        console.error('Max retry attempts reached. Aborting connection.');
    }
});

// Handling incoming messages
client.on('message', (topic, message) => {
    console.log('Received message:', message.toString());

    // Store the data in Mongo
    const data = JSON.parse(message.toString());
    db.store(data);
});

/* Routes */

// Live page (will be displayed at the home route)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/live.html'));
});

app.get('/data', (req, res) => {
    // Retrieve the latest data from MongoDB
    const latestData = db.getLatestData(); // Assuming you have a function like this in your db module

    res.json(latestData);
});

// Charts page
app.get('/charts', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/charts.html'));
});

// Start the server
server.listen(port, () => {
    console.log('Server is running on port:', port);
});
