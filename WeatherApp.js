//rightDiv
const userLocation = document.getElementById("userLocation");
userLocation.style.textTransform = "capitalize";
const searchBtn = document.getElementById("searchBtn");
const displayLocation = document.getElementById("displayLocation");
const displayTemperature = document.getElementById("displayTemperature");
const displayHumidity = document.getElementById("displayHumidity");
const displayWindspeed = document.getElementById("displayWindspeed");
//firstDay
const firstDayIcon = document.getElementById("firstDayIcon");
const firstDay = document.getElementById("firstDay");
const firstDayTemp = document.getElementById("firstDayTemp");
//secondDay
const secondDayIcon = document.getElementById("secondDayIcon");
const secondDay = document.getElementById("secondDay");
const secondDayTemp = document.getElementById("seondDayTemp");
//thirdDay
const thirdDayIcon = document.getElementById("thirdDayIcon");
const thirdDay = document.getElementById("thirdDay");
const thirdDayTemp = document.getElementById("thirdDayTemp");

//leftDiv
const now = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
// const currentIcon = document.getElementById("currentIcon");
const currentIcon = document.getElementById("currentIcon");
const currentTemp = document.getElementById("currentTemp");
const currentDescription = document.getElementById("currentDescription");
const displayFeelsLike = document.getElementById("displayFeelsLike");

// console.log(currentIcon);

const defaultIconUrl = 'https://openweathermap.org/img/wn/10d@2x.png';

function updateWeatherIcon(description){
    let iconUrl;

    //Map weather description to icon URLs
    switch (description.toLowerCase()){
        case 'clear sky':
            iconUrl = `https://openweathermap.org/img/wn/01d.png`;
            break;
        case 'sunny':
            iconUrl = `https://openweathermap.org/img/wn/01d.png`;
            break;
        case 'few clouds':
            iconUrl = `https://openweathermap.org/img/wn/02d.png`;
            break;
        case 'scattered clouds':
            iconUrl = `https://openweathermap.org/img/wn/03d.png`;
            break;
        case 'clouds':
            iconUrl = `https://openweathermap.org/img/wn/04d.png`;
            break;
        case 'broken clouds':
            iconUrl = `https://openweathermap.org/img/wn/04d.png`;
            break;
        case 'shower rain':
            iconUrl = `https://openweathermap.org/img/wn/09d.png`;
            break;
        case 'rain':
            iconUrl = `https://openweathermap.org/img/wn/10d.png`;
            break;
        case 'thunderstorm':
            iconUrl = `https://openweathermap.org/img/wn/11d.png`;
            break;
        case 'snow':
            iconUrl = `https://openweathermap.org/img/wn/13d.png`;
            break;
        case 'mist':
            iconUrl = `https://openweathermap.org/img/wn/50d.png`;
            break;
        case 'haze':
            iconUrl = `https://openweathermap.org/img/wn/50d.png`;
            break;
        case 'smoke':
            iconUrl = `https://openweathermap.org/img/wn/50d.png`;
            break;
        default:
            iconUrl = 'defaultIconUrl';
            break;
    }
    //Set the src attribute of the currentIcon image element
    currentIcon.src = iconUrl;
}


async function checkWeather(city){
    const APIKey = 'ce54ce650f9b949f7776744fe5760da8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    const weatherData = await fetch(`${url}`).then(response => response.json());
    
    console.log(weatherData);
    //rightDiv
    displayLocation.innerHTML = `${city}`;
    displayTemperature.innerHTML = `${weatherData.main.temp}&deg C`;
    displayHumidity.innerHTML = `${weatherData.main.humidity} %`;
    displayWindspeed.innerHTML = `${weatherData.wind.speed} kph`;
    displayFeelsLike.innerHTML = `${Math.round(weatherData.main.feels_like)}&deg C`;
    //leftDiv
    currentDay.innerHTML = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const monthNames = ["January", "February",  "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    currentDate.innerHTML = `${date < 10 ? '0' : ''}${date} ${month < 10 ? '0' : ''}${month} ${year}`;

    updateWeatherIcon(weatherData.weather[0].description);//Update the weather icon based on the description
    currentTemp.innerHTML = `${(Math.round(weatherData.main.temp))}&deg C`;
    currentDescription.innerHTML =`${weatherData.weather[0].description}`;

}

async function threeDaysForecast(city){
    
    const APIKey = 'ce54ce650f9b949f7776744fe5760da8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    const response = await fetch(url);
    const data = await response.json();

    //extract and display the forecast for the next 3 days
    const nextThreeDays = data.list.slice(0, 8 * 3);// Each day has 8 entries, so we take 3 days (8 * 3)
    
    console.log(nextThreeDays);

    // firstDayIcon.innerHTML = ;

}
searchBtn.addEventListener('click', () => {
    checkWeather(userLocation.value);
});

// main: 
// feels_like: 39.99
// humidity: 65
// temp
// : 
// 32.99
//wind: 
// speed: 4.52
//weather: description: 'clear sky'

// Mapping of weather conditions to Font Awesome classes
// const weatherIcons = {
//     thunderstorm: 'fas fa-bolt',
//     cloudMeatball: 'fas fa-cloud-meatball',
//     cloudMoon: 'fas fa-cloud-moon',
//     cloudMoonRain: 'fas fa-cloud-moon-rain',
//     cloudRain: 'fas fa-cloud-rain',
//     cloudShowersHeavy: 'fas fa-cloud-showers-heavy',
//     cloudSun: 'fas fa-cloud-sun',
//     cloudSunRain: 'fas fa-cloud-sun-rain',
//     meteor: 'fas fa-meteor',
//     pooStorm: 'fas fa-poo-storm',
//     rainbow: 'fas fa-rainbow',
//     smog: 'fas fa-smog',
//     snowflake: 'fas fa-snowflake',
//     snowflakeFar: 'far fa-snowflake',
//     sun: 'fas fa-sun',
//     sunFar: 'far fa-sun',
//     temperatureHigh: 'fas fa-temperature-high',
//     temperatureLow: 'fas fa-temperature-low',
//     water: 'fas fa-water',
//     wind: 'fas fa-wind',
//     unknown: 'fas fa-question' // Default icon for unknown conditions
// };
// Function to update the weather icon based on the given weather condition
// function updateWeatherIcon(weatherCondition){
//     const currentIconClass = weatherIcons[weatherCondition] || weatherIcons.unknown;
//     currentIcon.className = currentIconClass;//Updates the class of the weather icon container
// }
