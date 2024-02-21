function searchWeather() {
    const locationInput = document.getElementById('locationInputOverlay');
    const cityName = locationInput.value;

    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '191a1864be336917d1d37dcce2d3f0d9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo(data, cityName);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherInfo(weatherData, cityName) {
    const weatherCity = document.getElementById('weatherCity');
    const weatherDescription = document.getElementById('weatherDescription');
    const weatherInfo = document.getElementById('weatherInfo');

    if (weatherData.cod === '404') {
        weatherCity.textContent = 'City not found';
        weatherDescription.textContent = '';
        weatherInfo.textContent = '';
    } else {
        const description = weatherData.weather[0].description;
        const temperatureKelvin = weatherData.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        const humidity = weatherData.main.humidity;

        weatherCity.textContent = `Weather in ${cityName}`;
        weatherDescription.textContent = `Current conditions: ${description}`;
        weatherInfo.innerHTML = `Temperature: ${temperatureCelsius.toFixed(2)}°C<br>Humidity: ${humidity}%`;
        showPopup(cityName);
    }
}
function showPopup(cityName) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closePopup);
    
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    
    const weatherInfo = document.getElementById('weatherInfo').innerHTML;
    popupContent.innerHTML = `<h2>${cityName}</h2>${weatherInfo}`;
    
    popup.appendChild(closeBtn);
    popup.appendChild(popupContent);
    
    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}
