const currentWeatherResults = document.getElementById('temp');
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
currentWeatherResults.innerHTML =  '';
let display = document.createElement('li')
display.innerHTML = "Temp:" + cityWeather.main.temp;
currentWeatherResults.appendChild(display);
}




/* ========== Event Listener ========== */

weatherForm.addEventListener('submit', handleSearch);
