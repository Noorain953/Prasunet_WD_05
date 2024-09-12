const apiKey = 'f6b9dd51cb654c308ab141904240809'; // Replace with your WeatherAPI key
const weatherContainer = document.getElementById('weatherContainer');
let isCelsius = true; // Track if temperature is in Celsius

document.getElementById('fetchWeather').addEventListener('click', getWeather);
document.getElementById('toggleUnit').addEventListener('click', toggleTemperatureUnit);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            document.getElementById('errorMessage').textContent = error.message;
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('weatherInfo').style.display = 'none';
        });
}

function displayWeatherData(data) {
    const { location, current } = data;
    const temperature = isCelsius ? current.temp_c : current.temp_f;
    const temperatureUnit = isCelsius ? '°C' : '°F';

    document.getElementById('location').textContent = `Weather in ${location.name}`;
    document.getElementById('description').textContent = `Condition: ${current.condition.text}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} ${temperatureUnit}`;
    document.getElementById('humidity').textContent = `Humidity: ${current.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${current.wind_kph} kph`;

    // Use WeatherAPI's provided icon URL
    document.getElementById('weatherIcon').src = `https:${current.condition.icon}`;

    // Update background image based on weather condition
    updateBackgroundImage(current.condition.text);

    document.getElementById('weatherInfo').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

// Toggle between Celsius and Fahrenheit
function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(); // Fetch and update weather data with new unit
    }
}

// Function to change background image based on weather condition
function updateBackgroundImage(condition) {
    let imageUrl;

    switch (condition.toLowerCase()) {
        case 'sunny':
            imageUrl = 'images/sunny.jpg'; // Path to sunny background image
            break;
        case 'cloudy':
            imageUrl = 'images/cloudy.jpg'; // Path to cloudy background image
            break;
        case 'rain':
            imageUrl = 'images/rain.jpg'; // Path to rainy background image
            break;
        case 'snow':
            imageUrl = 'images/snow.jpg'; // Path to snowy background image
            break;
        default:
            imageUrl = 'images/default.jpg'; // Path to default background image
            break;
    }

    weatherContainer.style.backgroundImage = `url(${imageUrl})`;
}
