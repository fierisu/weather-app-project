const searchButton = document.querySelector("#search-text-input");
const header = document.querySelector("#city-element");
const searchFor = document.querySelector(".input-city");
let tempSection = document.querySelector("#temperature-element");
const temperatureCelsius = document.querySelector("#to-celsius");
const temperatureFahrenheit = document.querySelector("#to-fahrenheit");
const apiKey = "9b2899fa2589bca94665fbb84db2ef36";
const currentData = document.querySelector(".current-location-button");
const showCurrentDataBtn = document.querySelector('.show-current-data');
let iconElement = document.querySelector("#weather-icon");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let weatherDescriptionBlock = document.querySelector(".weather-description");
let now = new Date();

let currentTemperature
let time = document.querySelector(".time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

time.innerHTML = `${day} ${hours}:${minutes}`;

navigator.geolocation.getCurrentPosition(handlePosition);

showCurrentDataBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(handlePosition);
})

searchButton.addEventListener("click", showCity);

temperatureCelsius.addEventListener("click", toCelsius);
 temperatureFahrenheit.addEventListener("click", toFahrenheit);

function handlePosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=9b2899fa2589bca94665fbb84db2ef36`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(res => {
    currentTemperature = res.data.main.temp;
    showCurrentCity(res)
    showTemperature(res)
  });
}

function showData (city) {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b2899fa2589bca94665fbb84db2ef36`;
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(showCityData);
}

function showCityData (response) {
currentTemperature = response.data.main.temp
 header.innerHTML = `${response.data.name}`;
 tempSection.innerHTML = `${Math.round(response.data.main.temp)}`
 descriptionElement.innerHTML = `${response.data.weather[0].description}`;
 humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
 windElement.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}km/h`
}

function showCity(event) {
  event.preventDefault();
  if (searchFor.value) {
    showData(searchFor.value)
  } else {
    header.innerHTML = null;
    alert("Please, enter a city");
  }
}

function showTemperature (response) {
  let temperatureCelsius = Math.round(response.data.main.temp);
  tempSection.innerHTML = `${temperatureCelsius}`;
  tempSection.innerHTML = `${Math.round(response.data.main.temp)}`
 descriptionElement.innerHTML = `${response.data.weather[0].description}`;
 humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
 windElement.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}km/h`
 }

 function showCurrentCity (response) {
  console.log(response)
  let currentCity = response.data.name;
  header.innerHTML = `${currentCity}`;
 }

function toCelsius () {
  tempSection.innerHTML = `${Math.round(currentTemperature)}`
 }

 function toFahrenheit () {
  let temperature = Math.round((((currentTemperature) - 32) * 5) / 9);
  tempSection.innerHTML = `${temperature}°F`;
 }
