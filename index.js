const searchButton = document.querySelector("#search-text-input");
const header = document.querySelector("header");
const searchFor = document.querySelector(".input-city");
const temperatureCF = document.querySelector(".temperature");
const apiKey = "9b2899fa2589bca94665fbb84db2ef36";
const currentData = document.querySelector(".current-location-button");
const showCurrentDataBtn = document.querySelector('.show-current-data');

showCurrentDataBtn.addEventListener('click', showCurrentData)

function showData (city) {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b2899fa2589bca94665fbb84db2ef36`;
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(showCityData);
}

function showCityData (response) {
 header.innerHTML = `${response.data.name}`
 temperatureCF.innerHTML = `${Math.round(response.data.main.temp)}°C`
}

function showCity(event) {
  console.log(event);
  event.preventDefault();
  if (searchFor.value) {
    showData(searchFor.value)
  } else {
    header.innerHTML = null;
    alert("Please, enter a city");
  }
}

searchButton.addEventListener("click", showCity);

function showCurrentData () {
  function handlePosition(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=9b2899fa2589bca94665fbb84db2ef36`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(res => {
      showCurrentCity(res)
      showTemperature(res)
    });
  }
  
    navigator.geolocation.getCurrentPosition(handlePosition);
  
  function showTemperature (response) {
    let temperatureCelcius = Math.round(response.data.main.temp);
    let tempSection = document.querySelector(".temperature");
    tempSection.innerHTML = `${temperatureCelcius}°C`;
   }
  
   function showCurrentCity (response) {
    let currentCity = response.data.name;
    header.innerHTML = `${currentCity}`;
   }
}

let temp = 21;
let now = new Date();
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

function toFahrenheit(event) {
  if (temperatureCF.classList.contains("celsium")) {
    temp = Math.round((temp * 9) / 5 + 32);
    temperatureCF.innerHTML = `${temp}°F`;
    temperatureCF.classList.remove("celsium");
    temperatureCF.classList.add("fahrenheit");
  } else if (temperatureCF.classList.contains("fahrenheit")) {
    temp = Math.round(((temp - 32) * 5) / 9);
    temperatureCF.innerHTML = `${temp}°C`;
    temperatureCF.classList.remove("fahrenheit");
    temperatureCF.classList.add("celsium");
  }
}

temperatureCF.addEventListener("click", toFahrenheit);
