// Handling incoming messages
client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());

  // Parse the JSON message (assuming it's in JSON format)
  const data = JSON.parse(message.toString());

  // Update HTML elements with the received data
  document.getElementById('live-temperature').textContent = `Temperature: ${data.temperature} °C`;
  document.getElementById('live-humidity').textContent = `Humidity: ${data.humidity} %`;
  document.getElementById('live-pressure').textContent = `Pressure: ${data.pressure} hPa`;
  document.getElementById('live-altitude').textContent = `Altitude: ${data.altitude} meters`;

  // You can also update the chart with the received data, depending on your chart implementation
  updateChart(data);
});

// Function to update the chart (you need to implement this function based on your chart library)
function updateChart(data) {
  // Implement the logic to update the chart with the new data
  // Example: Assuming you are using Chart.js
  // Assuming you have a global variable named 'myChart' initialized with your chart
  myChart.data.labels.push(new Date()); // Assuming the x-axis is time
  myChart.data.datasets[0].data.push(data.temperature); // Assuming the y-axis is temperature
  myChart.update(); // Update the chart
}
