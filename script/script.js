const mainContainer = document.getElementById('mainContainer')
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const uvIndex = document.getElementById('uvIndex')
// const searchButton = document.getElementById('searchButton');
// let weatherSearch = document.getElementById('weatherSearch')
const weatherForm = document.getElementById('weatherForm')


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
        console.log("data", data)
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

    const currentTemp = document.createElement('span')
    temp.innerHTML = " " + cityWeather.main.temp;
    temp.appendChild(currentTemp);

    const currentWind = document.createElement('span')
    wind.innerHTML = " " + cityWeather.wind.speed;
    wind.appendChild(currentWind);

    const currentHumidity = document.createElement('span')
    humidity.innerHTML = " " + cityWeather.main.humidity;
    wind.appendChild(currentWind);

    const currentUvIndex = document.createElement('span')
    uvIndex.innerHTML = " " + cityWeather.wind.speed;
    wind.appendChild(currentWind);

}


function getFiveDayWeather(cityCoord) {
    const cityLon = cityCoord.coord.lon;
    const cityLat = cityCoord.coord.lat;
    fetch(`${CONFIG.onecallEndpoint}?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=current&appid=${CONFIG.owmKey}`)
    .then(response => response.json())
    .then(data => {
        console.log("data", data)
    })
    .catch(err => console.log("Lat and Lon needed!", err))
}

/* ========== Event Listener ========== */

weatherForm.addEventListener('submit', handleSearch);
