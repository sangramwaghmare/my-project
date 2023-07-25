// Get references to the DOM elements
const cityInput = document.getElementById("city");
const searchButton = document.getElementById("searchbutton");
const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const weatherDescriptionElement = document.getElementById("weather-description");

searchButton.addEventListener("click", getWeather);

function getWeather() {
  const apiKey = "790ccd9d56f1b018f5419383eec3b3e5";
  const cityName = cityInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        cityNameElement.textContent = "City not found";
        temperatureElement.textContent = "";
        weatherDescriptionElement.textContent = "";
      } else {
        const temperature = (data.main.temp - 273.15).toFixed(1); // Convert temperature from Kelvin to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `Temperature: ${temperature} °C`;
        weatherDescriptionElement.textContent = `Description: ${description}`;
        weatherDescriptionElement.innerHTML += `<img src="${iconUrl}" alt="Weather Icon">`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}
