const weatherInfo = document.getElementById('weather-info');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location');

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather information
function displayWeather(data) {
    const { name, sys, main, weather } = data;
    const country = sys.country;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
}

// Event listener for location form submission
locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        const weatherData = await getWeather(location);
        if (weatherData) {
            displayWeather(weatherData);
        }
    }
});

// Get weather data based on user's geolocation if available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    }, (error) => {
        console.error('Error getting user location:', error);
    });
}
