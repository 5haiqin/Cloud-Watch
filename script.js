
const apiKey = '30dd8177aab4fe949f39a539f60e42b8';

function searchWeather() {
  const cityInput = document.getElementById('city-input');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const visibility = document.getElementById('visibility');
  const pressure = document.getElementById('pressure');
  const humidity = document.getElementById('humidity');
  const dewPoint = document.getElementById('dew-point');
  const feelsLike = document.getElementById('feels-like');
  const windSpeed = document.getElementById('wind-speed');

  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found');
        return;
      }
      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      description.textContent = data.weather[0].description;
      visibility.textContent = `Visibility: ${data.visibility / 1000} km`;
      pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      dewPoint.textContent = `Dew Point: ${calculateDewPoint(data.main.temp, data.main.humidity)}°C`;
      feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      cityInput.value = '';
    })
    .catch(error => {
      alert('An error occurred');
      console.error(error);
    });
}

function calculateDewPoint(temperature, humidity) {
  const dewPoint = (temperature - ((100 - humidity) / 5));
  return dewPoint.toFixed(2);
}
