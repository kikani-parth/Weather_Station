// public/app.js

// Assume you have a reference to the HTML elements
const temperatureElement = document.getElementById('temperature-placeholder');
const humidityElement = document.getElementById('humidity-placeholder');
const pressureElement = document.getElementById('pressure-placeholder');
const altitudeElement = document.getElementById('altitude-placeholder');

// Function to fetch data from the server
async function fetchData() {
    try {
        const response = await fetch('/data'); // Assuming you have an API endpoint on the server
        const data = await response.json();

        // Update placeholders with live data
        if (data.temperature) {
            temperatureElement.textContent = `Temperature: ${data.temperature} °C`;
        }

        if (data.humidity) {
            humidityElement.textContent = `Humidity: ${data.humidity} %`;
        }

        if (data.pressure) {
            pressureElement.textContent = `Pressure: ${data.pressure} hPa`;
        }

        if (data.altitude) {
            altitudeElement.textContent = `Altitude: ${data.altitude} meters`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data initially
fetchData();

// Poll for data every 5 seconds (adjust as needed)
setInterval(fetchData, 5000);
