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

const ctx = document.getElementById('live-chart').getContext('2d');
const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Live Data',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

function updateChartData(newData) {
    const currentData = liveChart.data.datasets[0].data;
    const currentLabels = liveChart.data.labels;

    // Add new data point
    currentData.push(newData.value);
    currentLabels.push(currentLabels.length);

    // Remove oldest data point if the number of data points exceeds a certain limit
    const maxDataPoints = 20;
    if (currentData.length > maxDataPoints) {
        currentData.shift();
        currentLabels.shift();
    }

    // Update the chart
    liveChart.update();
}

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
    updateChartData(data);
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


app.get('/historical-data', async (req, res) => {
    try {
      const historicalData = await read({});
      res.json(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/livedata', async (req, res) => {
    try {
      const liveData = await readLatestData(); // Implement readLatestData based on your requirements
      res.json(liveData);
    } catch (error) {
      console.error('Error fetching live data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the server
server.listen(port, () => {
    console.log('Server is running on port:', port);
});
