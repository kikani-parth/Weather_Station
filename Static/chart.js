// Server (Assuming you are using Express)
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sample historical data (replace this with your logic to fetch real historical data)
const historicalData = [
    { timestamp: '2023-01-01', value: 20 },
    { timestamp: '2023-01-02', value: 25 },
    { timestamp: '2023-01-03', value: 18 },
    // Add more data as needed
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/historical-data', (req, res) => {
    res.json(historicalData);
});

app.get('/livedata', (req, res) => {
    // Replace this with your logic to fetch live data
    const liveData = {
        temperature: Math.random() * 30,
        humidity: Math.random() * 100,
        pressure: Math.random() * 1000,
        altitude: Math.random() * 500,
    };
    res.json(liveData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Client (app.js)
document.addEventListener('DOMContentLoaded', function () {
    // Fetch historical data from your server
    fetch('/historical-data')
        .then(response => response.json())
        .then(historicalData => {
            // Process and display historical data using Chart.js
            displayHistoricalChart(historicalData);
        })
        .catch(error => console.error('Error fetching historical data:', error));

    // Fetch live data initially
    fetchLiveData();

    // Poll for live data every 5 seconds (adjust as needed)
    setInterval(fetchLiveData, 5000);

    function displayHistoricalChart(historicalData) {
        // Extract data and labels from historical data
        const labels = historicalData.map(entry => entry.timestamp);
        const dataValues = historicalData.map(entry => entry.value);

        // Initialize Chart.js for the date range chart
        const ctx = document.getElementById('date-range-chart').getContext('2d');
        const historicalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Historical Data',
                    data: dataValues,
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
    }

    function fetchLiveData() {
        // Fetch live data from the server
        fetch('/livedata')
            .then(response => response.json())
            .then(data => {
                // Update placeholders with live data
                updateLiveDataPlaceholders(data);
            })
            .catch(error => console.error('Error fetching live data:', error));
    }

    function updateLiveDataPlaceholders(data) {
        // Update live data placeholders in the HTML
        document.getElementById('temperature-placeholder').textContent = `Temperature: ${data.temperature} °C`;
        document.getElementById('humidity-placeholder').textContent = `Humidity: ${data.humidity} %`;
        document.getElementById('pressure-placeholder').textContent = `Pressure: ${data.pressure} hPa`;
        document.getElementById('altitude-placeholder').textContent = `Altitude: ${data.altitude} meters`;
    }
});
