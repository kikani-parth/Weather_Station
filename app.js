const temperatureHistory = document.getElementById(" ");
const  humidityHistory = document.getElementById(" ");
const pressureHistory = document.getElementById(" ");
const altitudeHistory  = document.getElementById(" ");

const temperatureGauge = document.getElementById(" ");
const humidityGauge = document.getElementById(" ");
const  pressureGauge = document.getElementById(" ");
const altitudeGauge = document.getElementById(" ");

// History Data
let tempTrace = {
    x: [],
    y: [],
    name: "Temperature",
    mode: "lines+markers",
    type: "line",
  };
  let  humidTrace = {
    x: [],
    y: [],
    name: "Humidity",
    mode: "lines+markers",
    type: "line",
  };
  var pressTrace = {
    x: [],
    y: [],
    name: "Pressure",
    mode: "lines+markers",
    type: "line",
  };
  let  altitudeTrace = {
    x: [],
    y: [],
    name: "Altitude",
    mode: "lines+markers",
    type: "line",
  };
  
  let temperatureLayout = {
    autosize: false,
    title: {
      text: "Temperature",
    },
    font: {
      size: 14,
      color: "#7f7f7f",
    },
    colorway: ["#B22222"],
    width: 450,
    height: 260,
    margin: { t: 30, b: 20, pad: 5 },
  };
  let  humidityLayout = {
    autosize: false,
    title: {
      text: "Humidity",
    },
    font: {
      size: 14,
      color: "#7f7f7f",
    },
    colorway: ["#00008B"],
    width: 450,
    height: 260,
    margin: { t: 30, b: 20, pad: 5 },
  };
  let pressureLayout = {
    autosize: false,
    title: {
      text: "Pressure",
    },
    font: {
      size: 14,
      color: "#7f7f7f",
    },
    colorway: ["#FF4500"],
    width: 450,
    height: 260,
    margin: { t: 30, b: 20, pad: 5 },
  };
  let altitudeLayout = {
    autosize: false,
    title: {
      text: "Altitude",
    },
    font: {
      size: 14,
      color: "#7f7f7f",
    },
    colorway: ["#008080"],
    width: 450,
    height: 260,
    margin: { t: 30, b: 20, pad: 5 },
  };