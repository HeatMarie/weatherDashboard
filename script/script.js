const mainContainer = document.getElementById('mainContainer')
const getFiveDayContainer = document.getElementById('fiveDayContainer')
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const uvIndex = document.getElementById('uvIndex')
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
const recentSearch = document.querySelector('.recentContainer');


const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
let dt = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
let savedCity = [];
const storage = window.localStorage;


// Gets local Storage and sets the Recent Searach

getLocalStorage();

// Fetches the city by Name, This is also used to import the coords into the other fetch 


function getWeatherByCityName(cityName) {
   
    fetch(`${CONFIG.omwEndpoint}?q=${cityName}&units=imperial&appid=${CONFIG.owmKey}`)
    .then(response => response.json())
    .then(data => {
        displaystuff(data);
        getFiveDayWeather(data)
        cityHistory(data.name)
       console.log(data);
        if(savedCity && savedCity.indexOf(cityName) < 0){
            createButton(cityName);
            savedCity.push(cityName);
            saveToLocalStorage();
        }
        
    })
   
    .catch(err => console.log("wrong city name!", err))
}

// handles the the search inserting search input to give the getWeatherByCityName the name of the city to fetch

function handleSearch(e){
    e.preventDefault(e);
    const searchInput = e.target[0].value
    getWeatherByCityName(searchInput);  
    
   
}


// Saves City's to local Storage to be fetched later

function saveToLocalStorage(){
    storage.setItem("savedCity", JSON.stringify(savedCity));
    
}

// This does something. Not sure what entirely but the entire thing breaks without it. 
function cityHistory(cityWeather) {
    const storage = window.localStorage;
    const cityHistory = JSON.parse(storage.getItem('cityWeather'));
    const newCity = [];
    newCity.push(cityHistory)
}

// Creates the buttons for the Recent Search

function createButton(searchInput) {
    const createButton = document.createElement("button");
    createButton.setAttribute("type", "submit");
    createButton.setAttribute("value", "submit");
    createButton.classList.add("buttonClass")
    createButton.innerHTML = searchInput
    recentSearch.appendChild(createButton);
    createButton.addEventListener('click', function(e){
        e.preventDefault();
        getWeatherByCityName(searchInput);
    })

}

// Displays thingsin the current section

function displaystuff(cityWeather){
    mainContainer.style.display = "flex";
    getFiveDayContainer.style.display ="flex";
    cityName.innerHTML =  '';

    const currentCityName = document.createElement('h1')
    currentCityName.innerHTML = cityWeather.name;
    cityName.appendChild(currentCityName);

    currentDay.innerHTML = dt;

    const currentTemp = document.createElement('span')
    temp.innerHTML = " " + cityWeather.main.temp + '\u00B0f';
    temp.appendChild(currentTemp);

    const currentWind = document.createElement('span')
    wind.innerHTML = " " + cityWeather.wind.speed + "MPH";
    wind.appendChild(currentWind);
}

// gets info from the lat and long guy for the humidity and uv index

function humidityAndUVIndexDisplay(cityWeather){
    const currentHumidity = document.createElement('span')
    humidity.innerHTML = " " + cityWeather.current.humidity + "%";
    humidity.appendChild(currentHumidity);

    const currentUvIndex = document.createElement('span')
    uvIndex.innerHTML = " " + cityWeather.current.uvi;
    uvIndex.appendChild(currentUvIndex);


    if(cityWeather.current.uvi <= "2"){
        uvIndex.style.backgroundColor = "green";
    } else if(cityWeather.current.uvi >= "3" && cityWeather.current.uvi <= "5") {
        uvIndex.style.backgroundColor = "yellow";
    } else {
        uvIndex.style.backgroundColor = "red";
    }
}

// displays the daily temp 



function dailyTemp(dailyTemp) {
    const cityDay1Temp = document.createElement('span');
    day1Temp.innerHTML = " " + dailyTemp.daily[1].temp.day + "\u00B0f";
    day1Temp.appendChild(cityDay1Temp)
   
    const cityDay2Temp = document.createElement('span');
    day2Temp.innerHTML = " " + dailyTemp.daily[2].temp.day + "\u00B0f";
    day2Temp.appendChild(cityDay2Temp)

    const cityDay3Temp = document.createElement('span');
    day3Temp.innerHTML = " " + dailyTemp.daily[3].temp.day + "\u00B0f";
    day3Temp.appendChild(cityDay3Temp)

    const cityDay4Temp = document.createElement('span');
    day4Temp.innerHTML = " " + dailyTemp.daily[4].temp.day + "\u00B0f";
    day4Temp.appendChild(cityDay4Temp)

    const cityDay5Temp = document.createElement('span');
    day5Temp.innerHTML = " " + dailyTemp.daily[5].temp.day + "\u00B0f";
    day5Temp.appendChild(cityDay5Temp)

}



// displays the daily wind

function dailyWind(dailyWind) {
    const cityDay1Wind = document.createElement('span');
    day1Wind.innerHTML = " " + dailyWind.daily[1].wind_speed + "MPH";
    day1Wind.appendChild(cityDay1Wind)

    const cityDay2Wind = document.createElement('span');
    day2Wind.innerHTML = " " + dailyWind.daily[2].wind_speed + "MPH";
    day2Wind.appendChild(cityDay2Wind)

    const cityDay3Wind = document.createElement('span');
    day3Wind.innerHTML = " " + dailyWind.daily[3].wind_speed + "MPH";
    day3Wind.appendChild(cityDay3Wind)

    const cityDay4Wind = document.createElement('span');
    day4Wind.innerHTML = " " + dailyWind.daily[4].wind_speed + "MPH";
    day4Wind.appendChild(cityDay4Wind)

    const cityDay5Wind = document.createElement('span');
    day5Wind.innerHTML = " " + dailyWind.daily[5].wind_speed + "MPH";
    day5Wind.appendChild(cityDay5Wind)

}

// displays the daily humidity

function dailyHumidity(dailyHumidity) {
    const cityDay1Humidity = document.createElement('span');
    day1Humidity.innerHTML = " " + dailyHumidity.daily[1].humidity + "%";
    day1Humidity.appendChild(cityDay1Humidity);

    const cityDay2Humidity = document.createElement('span');
    day2Humidity.innerHTML = " " + dailyHumidity.daily[2].humidity + "%";
    day2Humidity.appendChild(cityDay2Humidity);

    const cityDay3Humidity = document.createElement('span');
    day3Humidity.innerHTML = " " + dailyHumidity.daily[3].humidity + "%";
    day3Humidity.appendChild(cityDay3Humidity);

    const cityDay4Humidity = document.createElement('span');
    day4Humidity.innerHTML = " " + dailyHumidity.daily[4].humidity + "%";
    day4Humidity.appendChild(cityDay4Humidity);

    const cityDay5Humidity = document.createElement('span');
    day5Humidity.innerHTML = " " + dailyHumidity.daily[5].humidity + "%";
    day5Humidity.appendChild(cityDay5Humidity);
}

// this pulls in the lat and long from the getCityName guy and then does stuff

function getFiveDayWeather(cityCoord) {
    const cityLon = cityCoord.coord.lon;
    const cityLat = cityCoord.coord.lat;
    fetch(`${CONFIG.onecallEndpoint}?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${CONFIG.owmKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        humidityAndUVIndexDisplay(data);
        dailyTemp(data);  
        dailyWind(data);
        dailyHumidity(data);  
        setIcon(data);
        setDates(data);
    })
    .catch(err => console.log("Lat and Lon needed!", err))
}

// sets the dates inside each container

function setDates(data) {
    
    let day1DateT = new Date(data.daily[0].dt * 1000);
    document.getElementById("day1Date").innerHTML = DateTime.fromSeconds(data.daily[1].dt).toFormat('MM/dd/yyyy');
    document.getElementById("day2Date").innerHTML = DateTime.fromSeconds(data.daily[2].dt).toFormat('MM/dd/yyyy');
    document.getElementById("day3Date").innerHTML = DateTime.fromSeconds(data.daily[3].dt).toFormat('MM/dd/yyyy');
    document.getElementById("day4Date").innerHTML = DateTime.fromSeconds(data.daily[4].dt).toFormat('MM/dd/yyyy');
    document.getElementById("day5Date").innerHTML = DateTime.fromSeconds(data.daily[5].dt).toFormat('MM/dd/yyyy');
}

// sets the icons inside each container

function setIcon(data) {
    
    let path =  "https://openweathermap.org/img/wn/";

    document.getElementById('weatherIcon1').src=path + data.daily[1].weather[0].icon + ".png";
    document.getElementById('weatherIcon2').src=path + data.daily[2].weather[0].icon + ".png";
    document.getElementById('weatherIcon3').src=path + data.daily[3].weather[0].icon + ".png";
    document.getElementById('weatherIcon4').src=path + data.daily[4].weather[0].icon + ".png";
    document.getElementById('weatherIcon5').src=path + data.daily[5].weather[0].icon + ".png";
    document.getElementById('currentIcon').src=path + data.current.weather[0].icon + ".png";
}

// gets local storage and creates the button

function getLocalStorage() {
   
    let savedCityStorage = storage.getItem("savedCity");
    if(savedCityStorage !== "undefined" && savedCityStorage !== null){
        savedCityStorage = JSON.parse(savedCityStorage);
        for(i=0; i < savedCityStorage.length; i++) {
            createButton(savedCityStorage[i])
        }   
        savedCity = savedCityStorage;
    }
}

// TODO: GET DATA FROM LOCAL STORAGE CREATE BUTTONS TO HAVE IT RESEARCH



//MAKE FUNCTION FOR UV INDEX 


/* ========== Event Listener ========== */

weatherForm.addEventListener('submit', handleSearch);


