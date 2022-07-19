'use strict';
const title = document.querySelector(".title");
const searchButton = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const search = document.querySelector(".search");
const city = document.getElementById("city-name")
const temperature = document.querySelector(".temp");
const tempNumber = document.getElementById("temp-num")
const weatherIcon = document.getElementById("weather-icon");
const result = document.querySelector(".result");
const loadingUI = document.querySelector(".loading");


const changeMode = ()=>{
    //根據使用者的時區變換背景圖案
    const time = new Date().getHours();
    if(time>=18){
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1612515323322-d6d3c63c3a6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
    }
}
changeMode();

const renderWeather = function(data, inputCity){
    const currentTemp = data.main.temp.toFixed(1);
    const cityStr = inputCity.toString();
    const str = cityStr.split(' ').map((element) => {return element[0].toUpperCase() + element.slice(1).toLowerCase()}).join(' ');
    city.textContent = str;
    tempNumber.textContent = currentTemp;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  
    searchBar.value = ""
}


//search weather in specific city and display it
const getWeather = async function(inputCity){
    try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=1a43edf62ba75c3505e0065392454351&units=metric`)
    if(!res.ok) throw new Error('Please enter valid city name')
    const data = await res.json();

    renderWeather(data, inputCity)
    }
    catch(err){
        alert(err.message)
    }
};


// const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=1a43edf62ba75c3505e0065392454351&units=metric`)

// default: detect user's city
(async function(){
    try{
    const geoPromise = new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(
            (pos)=>resolve(pos),
            (err)=>reject(err.message)
        )
    })
    const res = await geoPromise;
    const {latitude, longitude} = res.coords;
    const lat = latitude.toFixed(2);
    const lon = longitude.toFixed(2)

    const resW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a43edf62ba75c3505e0065392454351&units=metric`)
    if(!resW.ok) throw new Error()
    const userWeather = await resW.json();
    renderWeather(userWeather, 'Your City')

}catch(err){
    alert(err.message)
}
    

}());


searchButton.addEventListener("click", (e)=>{
    getWeather(searchBar.value)

    
});

searchBar.addEventListener("keypress", (event) => {
    if (event.key == "Enter") 
    getWeather(searchBar.value)

});


