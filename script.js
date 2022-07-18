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

//search weather in specific city and display it
const getWeather = (inputCity) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=1a43edf62ba75c3505e0065392454351&units=metric`)
    .then(res =>{
        if(!res.ok){
            throw new Error()
        }     
        return res.json();
    })
    .then(data =>{
        const currentTemp = data.main.temp.toFixed(1);
        const cityStr = inputCity.toString();
        city.textContent = cityStr.slice(0, 1).toUpperCase() + cityStr.slice(1).toLowerCase() 
        tempNumber.textContent = currentTemp;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 
       
        
    })
    .catch(err=>alert(err.status))
    .finally(data=>{
        searchBar.value = "";
    });  
};


//default: detect user's city
navigator.geolocation.getCurrentPosition(function(pos){
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(res=>{
        if(!res.ok) throw new Error()
        return res.json()
    })
    .then((data)=>{
        getWeather(data.locality);
        console.log(data.locality)
       
    })
    .catch(err=>{
            console.log(err);
            alert('Cannot get your location!')
            getWeather('Taipei')
        })

    
});


searchButton.addEventListener("click", (e)=>{
    getWeather(searchBar.value)
    
});

searchBar.addEventListener("keypress", (event) => {
    if (event.key == "Enter") 
    getWeather(searchBar.value)
});


