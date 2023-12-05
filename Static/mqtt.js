// app.js
const dummyData = {
  liveTemperature: 25,
  liveHumidity: 50,
  livePressure: 1013.25,
  liveAltitude: 0,
  liveChartData: [10, 20, 30, 25, 35],
  dateRangeChartData: [], // Placeholder for date range data
};

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'YOUR_CITY';

function subscribeToMqtt() {
  // ... (existing MQTT subscription logic)

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      dummyData.liveTemperature = data.main.temp;
      dummyData.liveHumidity = data.main.humidity;
      dummyData.livePressure = data.main.pressure;
      dummyData.liveAltitude = calculateAltitude(data.main.pressure);

      updateUI();
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function updateUI() {
  document.getElementById('live-temperature').innerText = `Temperature: ${dummyData.liveTemperature} °C`;
  document.getElementById('live-humidity').innerText = `Humidity: ${dummyData.liveHumidity}%`;
  document.getElementById('live-pressure').innerText = `Pressure: ${dummyData.livePressure} hPa`;
  document.getElementById('live-altitude').innerText = `Altitude: ${dummyData.liveAltitude} meters`;

  updateLiveChart();
}

function updateLiveChart() {
  const ctxLive = document.getElementById('live-chart').getContext('2d');
  const liveChart = new Chart(ctxLive, {
    type: 'line',
    data: {
      labels: Array.from({ length: dummyData.liveChartData.length }, (_, i) => i + 1),
      datasets: [{
        label: 'Live Data',
        data: dummyData.liveChartData,
        borderColor: 'blue',
        fill: false,
      }],
    },
  });

  // Assume date range data is fetched from MongoDB, and update the chart
  fetchDateRangeDataFromMongo().then(dateRangeData => {
    dummyData.dateRangeChartData = dateRangeData;
    updateDateRangeChart();
  });
}

function updateDateRangeChart() {
  const ctxDateRange = document.getElementById('date-range-chart').getContext('2d');
  const dateRangeChart = new Chart(ctxDateRange, {
    type: 'line',
    data: {
      labels: Array.from({ length: dummyData.dateRangeChartData.length }, (_, i) => i + 1),
      datasets: [{
        label: 'Date Range Data',
        data: dummyData.dateRangeChartData,
        borderColor: 'green',
        fill: false,
      }],
    },
  });
}

function calculateAltitude(pressure) {
  const seaLevelPressure = 1013.25;
  const altitude = 44330 * (1 - Math.pow(pressure / seaLevelPressure, 0.1903));
  return altitude.toFixed(2);
}

async function fetchDateRangeDataFromMongo() {
  try {
    const connectToMongo = require('./mongo'); // Adjust the path based on your project structure
    const db = await connectToMongo();
    const collection = db.collection('your_collection_name'); // Replace with your actual collection name
    const dateRangeData = await collection.find(/* your query */).toArray();
    return dateRangeData.map(data => data.value); // Adjust the mapping based on your document structure
  } catch (error) {
    console.error('Error fetching date range data from MongoDB:', error);
    return [];
  }
}

subscribeToMqtt();
