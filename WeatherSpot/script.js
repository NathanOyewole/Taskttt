const apiKey = '8c70bde5cfcaf20225ff0f9c8ea651fb'; // Replace this with your actual API key

const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetchWeatherData(location);
    } else {
        displayErrorMessage('Please enter a location');
    }
});

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (response.ok) {
            displayWeatherData(data);
        } else {
            displayErrorMessage(data.message);
        }
    } catch (error) {
        displayErrorMessage('An error occurred while fetching weather data');
    }
}

function displayWeatherData(data) {
    const weather = data.weather[0];
    const temperature = Math.round(data.main.temp);
    const description = weather.description;
    const icon = `https://openweathermap.org/img/wn/${weather.icon}.png`;

    const weatherCard = `
        <div class="weather-card">
            <img src="${icon}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <div class="weather-description">${description}</div>
        </div>
    `;

    weatherInfo.innerHTML = weatherCard;
}

function displayErrorMessage(message) {
    const errorMessage = `<p class="error-message">${message}</p>`;
    weatherInfo.innerHTML = errorMessage;
}

function displayWeatherData(data) {
    const weather = data.weather[0];
    const temperature = Math.round(data.main.temp);
    const description = weather.description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;

    const icon = `https://openweathermap.org/img/wn/${weather.icon}.png`;

    const weatherCard = `
        <div class="weather-card">
            <img src="${icon}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <div class="weather-description">${description}</div>
            <div class="weather-details">
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Pressure: ${pressure} hPa</p>
            </div>
        </div>
    `;

    weatherInfo.innerHTML = weatherCard;
}

async function fetchWeatherData(location) {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
        ]);
        const [currentData, forecastData] = await Promise.all([currentResponse.json(), forecastResponse.json()]);
        
        if (currentResponse.ok && forecastResponse.ok) {
            displayWeatherData(currentData);
            displayForecastData(forecastData);
        } else {
            displayErrorMessage('Failed to fetch weather data');
        }
    } catch (error) {
        displayErrorMessage('An error occurred while fetching weather data');
    }
}

function displayForecastData(data) {
    const forecast = data.list.slice(0, 5); // Get forecast for the next 5 days (assuming forecast is provided in 3-hour intervals)
    let forecastHTML = '<h2>Forecast</h2>';

    forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const temperature = Math.round(item.main.temp);
        const description = item.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        forecastHTML += `
            <div class="forecast-item">
                <p>${formatDate(date)}</p>
                <img src="${icon}" alt="${description}">
                <p>${temperature}°C, ${description}</p>
            </div>
        `;
    });

    document.getElementById('forecast').innerHTML = forecastHTML;
}

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
