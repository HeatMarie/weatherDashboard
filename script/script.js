const mainContainer = document.getElementById('mainContainer')
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const uvIndex = document.getElementById('uvIndex')
// const searchButton = document.getElementById('searchButton');
// let weatherSearch = document.getElementById('weatherSearch')
const weatherForm = document.getElementById('weatherForm')
const currentDay = document.getElementById('currentDay')


const day1Date = document.getElementById('day1Date');
const day2Date = document.getElementById('day2Date');
const day3Date = document.getElementById('day3Date');
const day4Date = document.getElementById('day4Date');
const day5Date = document.getElementById('day5Date');

const day1Temp = document.getElementById('day1Temp');
const day2Temp = document.getElementById('day2Temp');
const day3Temp = document.getElementById('day3Temp');
const day4Temp = document.getElementById('day4Temp');
const day5Temp = document.getElementById('day5Temp');

const day1Wind = document.getElementById('day1Wind')
const day2Wind = document.getElementById('day2Wind')
const day3Wind = document.getElementById('day3Wind')
const day4Wind = document.getElementById('day4Wind')
const day5Wind = document.getElementById('day5Wind')



const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
let dt = DateTime.now().toLocaleString(DateTime.DATE_SHORT);


// function getWeatherByCityId(cityId) {
//     fetch(`${CONFIG.omwEndpoint}?id=${cityId}&appid=${CONFIG.owmKey}`)
//     .then(response => response.json())
//     .then(data => console.log("data", data))

//     .catch(err => console.log("wrong city name!", err))
// }

function getWeatherByCityName(cityName) {
    fetch(`${CONFIG.omwEndpoint}?q=${cityName}&units=imperial&appid=${CONFIG.owmKey}`)
    .then(response => response.json())
    .then(data => {
        saveToLocalStorage(data)
        // console.log("data", data)
        displaystuff(data);
        // latAndLong(data);
        getFiveDayWeather(data)
    })
    
    .catch(err => console.log("wrong city name!", err))
}


function handleSearch(e){
    e.preventDefault();
    const searchInput = e.target[0].value
    console.log("searchInput", searchInput)
    getWeatherByCityName(searchInput);
    // getWeatherByCityId('4887398');
    // console.log("event", e)
  
}

function saveToLocalStorage(cityWeather){
    const storage = window.localStorage;
    storage.setItem('cityWeather', JSON.stringify(cityWeather))
    
}


function displaystuff(cityWeather){
    cityName.innerHTML =  '';

    const currentCityName = document.createElement('h1')
    currentCityName.innerHTML = cityWeather.name;
    cityName.appendChild(currentCityName);

    currentDay.innerHTML = dt;

    const currentTemp = document.createElement('span')
    temp.innerHTML = " " + cityWeather.main.temp;
    temp.appendChild(currentTemp);

    const currentWind = document.createElement('span')
    wind.innerHTML = " " + cityWeather.wind.speed;
    wind.appendChild(currentWind);

}

function humidityAndUVIndexDisplay(cityWeather){
    const currentHumidity = document.createElement('span')
    humidity.innerHTML = " " + cityWeather.current.humidity;
    humidity.appendChild(currentHumidity);

    const currentUvIndex = document.createElement('span')
    uvIndex.innerHTML = " " + cityWeather.current.uvi;
    uvIndex.appendChild(currentUvIndex);
}

function dailyTemp(dailyTemp) {
    const cityDay1Temp = document.createElement('span');
    day1Temp.innerHTML = " " + dailyTemp.daily[0].temp.day + "\u00B0f";
    day1Temp.appendChild(cityDay1Temp)
   
    const cityDay2Temp = document.createElement('span');
    day2Temp.innerHTML = " " + dailyTemp.daily[1].temp.day + "\u00B0f";
    day2Temp.appendChild(cityDay2Temp)

    const cityDay3Temp = document.createElement('span');
    day3Temp.innerHTML = " " + dailyTemp.daily[2].temp.day + "\u00B0f";
    day3Temp.appendChild(cityDay3Temp)

    const cityDay4Temp = document.createElement('span');
    day4Temp.innerHTML = " " + dailyTemp.daily[3].temp.day + "\u00B0f";
    day4Temp.appendChild(cityDay4Temp)

    const cityDay5Temp = document.createElement('span');
    day5Temp.innerHTML = " " + dailyTemp.daily[4].temp.day + "\u00B0f";
    day5Temp.appendChild(cityDay5Temp)

}

function dailyWind(dailyWind) {
    const cityDay1Wind = document.createElement('span');
    day1Wind.innerHTML = " " + dailyWind.daily[0].wind_speed + "MPH";
    day1Wind.appendChild(cityDay1Wind)

}

function getFiveDayWeather(cityCoord) {
    const cityLon = cityCoord.coord.lon;
    const cityLat = cityCoord.coord.lat;
    fetch(`${CONFIG.onecallEndpoint}?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${CONFIG.owmKey}`)
    .then(response => response.json())
    .then(data => {
        console.log("data", data)
        humidityAndUVIndexDisplay(data)
        dailyTemp(data);  
        dailyWind(data)   
    })
    .catch(err => console.log("Lat and Lon needed!", err))
}

/* TODO: Make loop to get daily states: 
    - loop for date 
    - Loop for Temp 
    - Loop for wind
    - Loop for Humidity
*/




// TODO: GET DATA FROM LOCAL STORAGE CREATE BUTTONS TO HAVE IT RESEARCH

//TODO: GET ICONS FROM FONTAWESOME

//MAKE FUNCTION FOR UV INDEX 


/* ========== Event Listener ========== */

weatherForm.addEventListener('submit', handleSearch);
