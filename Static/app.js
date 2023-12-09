// Updated app.js

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

        // Initialize Chart.js for the date range selector
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

    // Function to fetch live data from the server
    async function fetchLiveData() {
        try {
            const response = await fetch('/livedata');
            const data = await response.json();

            // Update placeholders with live data
            updateLiveDataPlaceholders(data);
        } catch (error) {
            console.error('Error fetching live data:', error);
        }
    }

    // Update live data placeholders in the HTML
    function updateLiveDataPlaceholders(data) {
        const temperatureElement = document.getElementById('temperature-placeholder');
        const humidityElement = document.getElementById('humidity-placeholder');
        const pressureElement = document.getElementById('pressure-placeholder');
        const altitudeElement = document.getElementById('altitude-placeholder');

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
    }
});
