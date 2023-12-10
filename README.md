# Smart Weather Station
This project implements a Smart Weather Station that collects and displays weather data in real-time. The system utilizes a combination of technologies, including WebSocket for real-time communication, MQTT for IoT data exchange, and MongoDB for data storage.

Features
Real-Time Data Display: The system provides a live page displaying real-time weather data, accessible through the home route.

Interactive Charts: Users can explore historical weather data through interactive charts. The system supports bar/line charts for a specified date range and doughnut charts for specific sample numbers.

MQTT Integration: The Smart Weather Station is connected to an MQTT broker, allowing it to receive weather data from various sensors. The MQTT data is then forwarded to connected WebSocket clients for real-time updates.

MongoDB Integration: Weather data received via MQTT is stored in a MongoDB database for future reference and historical analysis.

Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- MQTT Broker

Installation
Clone the repository:
- git clone https://github.com/your-username/smart-weather-station.git

Install dependencies:
- cd smart-weather-station
- npm install

Configure MongoDB:
- Update the MongoDB connection URI in db.js with your own URI.

Start the server:
- node app.js
- The server will be running on http://localhost:3000.

Usage
Access the live page at http://localhost:3000 for real-time weather data.

Explore historical weather data through interactive charts at http://localhost:3000/charts.
