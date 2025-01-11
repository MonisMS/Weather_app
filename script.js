document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById('city-input')
    const getWeather=document.getElementById('get-weather-btn')

    const weatherInfo=document.getElementById('weather-info')
    
    const cityName=document.getElementById('city-name')
    const temperatureDisplay=document.getElementById('temperature')
    const dscriptionDisplay=document.getElementById('description')

    const errorDisplay=document.getElementById('error-message')

    const API_KEY ="29bb8137f26bfb7d22bd96fc22d117ab";    //use env variables

    getWeather.addEventListener("click" ,async ()=>{
        const city=cityInput.value.trim()
        if(!city) return;
//it may throw some eror 
//server database is always in another continent

try {
 const weatherData= await  fetchWeatherData(city);
 displayWeatherData(weatherData);
} catch (error) {
    showError()
}




    })


async function fetchWeatherData(city){
const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const response= await fetch(url);



if(!response.ok){
    throw new Error("City not found");
}
const data = await response.json();
return data
}
    
     function displayWeatherData(data){
        console.log(data)
        const {name,main,weather} =data
        cityName.textContent=name;
         temperatureDisplay.textContent=`Temperature:${main.temp}`;
        dscriptionDisplay.textContent=`Weather:${weather[0].description}`
        //unlock the display
        weatherInfo.classList.remove('hidden')
        errorDisplay.classList.add('hidden')
       

     }
     function showError(){
         weatherInfo.classList.add('hidden');
         errorDisplay.classList.remove('hidden');
     }

})