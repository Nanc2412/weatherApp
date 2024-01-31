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
const secondDayTemp = document.getElementById("secondDayTemp");
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
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;

    const forecastData = await fetch(`${forecastUrl}`).then(response => response.json());
    const forecastDays = forecastData.list.slice(1, 4);

    console.log(forecastData);

    // firstDayIcon, firstDay, and firstDayTemp
    firstDayIcon.src = `https://openweathermap.org/img/wn/${forecastDays[0].weather[0].description}.png`;
    firstDay.innerHTML = daysOfWeek[(now.getDay() + 1) % 7].slice(0,3);
    firstDayTemp.innerHTML = `${Math.round(forecastDays[0].main.temp)}&deg C`;

    // secondDayIcon, secondDay, and secondDayTemp
    secondDayIcon.src = `https://openweathermap.org/img/wn/${forecastDays[1].weather[0].description}.png`;
    secondDay.innerHTML = daysOfWeek[(now.getDay() + 2) % 7].slice(0,3);
    secondDayTemp.innerHTML = `${Math.round(forecastDays[1].main.temp)}&deg C`;

    // thirdDayIcon, thirdDay, and thirdDayTemp
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${forecastDays[2].weather[0].description}.png`;
    thirdDay.innerHTML = daysOfWeek[(now.getDay() + 3) % 7].slice(0,3);
    thirdDayTemp.innerHTML = `${Math.round(forecastDays[2].main.temp)}&deg C`;

}
searchBtn.addEventListener('click', async () => {
    checkWeather(userLocation.value);
    threeDaysForecast(userLocation.value);
});
