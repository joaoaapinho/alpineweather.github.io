const API_KEY= 'ecd156e81e52ba3fb0d39a8f32432b6e';
export const fetchApi = function (URL, callback) {

    fetch(`${URL}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => callback(data))
}
let defaultlat=38.736946;
let defaultlon= 9.142685;

let dailyData=[];
let airdataForecast=[];
let defaultcity='Lisbon';
let defaultcountry='Lisbon, PT';
let filteredSunrise;
let filteredSunset;

export const apiUrl={
    getDefaultWeather(lat,lon){
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
    },
    getForecast(lat,lon){
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`
    },
    getAirPollution(lat,lon){
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric`
    },
    getAirPollutionForecast(lat,lon){
        
        return `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}`
    }
   
}

// get 12h time from timestamp format
function formatTime(value) {
  const timeString= new Date(value*1000).toString().slice(15,25)
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

// get 12h time from timestamp format
function formatDate(value) {
    const date= new Date(value*1000).toString().slice(0,15).split(' ')[2]
    const month= new Date(value*1000).toString().slice(0,15).split(' ')[1]
    
      return (date + " " + month);
  }
//  sunrise / sunset calculation
let getSunriseSunSet = (function (value) {
    let res = new Date(value*1000);
    // res.toUTCString()
    let f=res.toUTCString().slice(17, 22)
    return f;
    // let Hour = res.getHours();
    // let Min = res.getMinutes();
    // if (Min < 10) {
    //     Min = '0' + Min
    // };
    // return `${Hour}:${Min}`;



    // return res.toUTCString().slice(17, 22)
});
// update view screen function
async function updateViewDisplay(location, weatherdata) {
    let {main, weather,sys, visibility,dt}= weatherdata;
    let {country, lat, lon}= location;
    let {description, icon }= weather[0]
    let {temp, feels_like,pressure, humidity}= main
console.log(weatherdata);
    if (sys.sunrise) {
        filteredSunrise=sys.sunrise
        filteredSunset= sys.sunset
    }
console.log(filteredSunrise);
    // getting the DOM
    const weatherdataDiv = document.querySelector('.current-forecast-inner');
    const currentWetherCountryDiv = document.querySelector('.currrent-weather-last');
    const sunsetvalueDiv = document.querySelector('.sunset-value');
    const sunrisevalueDiv = document.querySelector('.sunrise-value');
    const visibilitytextDiv = document.querySelector('.visibility-text');
     
console.log(weatherdata);
weatherdataDiv.innerHTML=`
<h1>
            ${temp}&#8451;
        </h1>
        <span>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" height='30' width='50' alt="weather-des">
        </span>
        <span>
            ${description}
        </span>
`

let date= new Date(dt*1000).toString().slice(0,11)

currentWetherCountryDiv.innerHTML= `
<span >

    <p class="p-0 m-0 text-muted">    <i class="fa fa-calendar-o" aria-hidden="true"></i> ${date}</p>
</span>

<span>
    <p class="p-0 m-0 text-muted"><i class="fa fa-map-marker" aria-hidden="true"></i> ${country}</p>
   
</span>`

sunrisevalueDiv.innerText=getSunriseSunSet(filteredSunrise)
sunsetvalueDiv.innerText=getSunriseSunSet(filteredSunset)
visibilitytextDiv.innerText= visibility/1000+' KM'

// humidity & pressure
document.querySelector('.humidity-value').innerText=humidity+ '%';
document.querySelector('.pressure-value').innerText=pressure +'hPa';
}

async function updateAirPollutionDataDisplay(filter=false, airdata) {
    if (filter===false) {
        
        const {list}= airdata
    const {o3, nh3, no2, so2} = list[0].components
 document.querySelector('.o3-value').innerText=o3;
 document.querySelector('.nh3-value').innerText=nh3;
 document.querySelector('.no2-value').innerText=no2;
 document.querySelector('.so2-value').innerText=so2;
    }else{
 
        
        const {o3, nh3, no2, so2} = airdata[0].components
     document.querySelector('.o3-value').innerText=o3;
     document.querySelector('.nh3-value').innerText=nh3;
     document.querySelector('.no2-value').innerText=no2;
     document.querySelector('.so2-value').innerText=so2;
    }
   
}

// hourly forecast datas view
async function updateHourlyForecaseDisplay(hourlydata) {
    const {list} = hourlydata;
    const forecaseDatas= list.slice(0,8)
   

    // putting value by DOM
    document.querySelector('.hourly-forecast-time1').innerText= formatTime(forecaseDatas[0].dt);
    document.querySelector('.hourly-forecast-time2').innerText= formatTime(forecaseDatas[1].dt);
    document.querySelector('.hourly-forecast-time3').innerText= formatTime(forecaseDatas[2].dt);
    document.querySelector('.hourly-forecast-time4').innerText= formatTime(forecaseDatas[3].dt);


    document.querySelector('.hourly-forecast-img1').src= `https://openweathermap.org/img/w/${forecaseDatas[0].weather[0].icon}.png`;
    document.querySelector('.hourly-forecast-img2').src= `https://openweathermap.org/img/w/${forecaseDatas[1].weather[0].icon}.png`;
    document.querySelector('.hourly-forecast-img3').src= `https://openweathermap.org/img/w/${forecaseDatas[2].weather[0].icon}.png`;
    document.querySelector('.hourly-forecast-img4').src= `https://openweathermap.org/img/w/${forecaseDatas[3].weather[0].icon}.png`;

    document.querySelector('.hourly-forecast-temp1').innerText= forecaseDatas[0].main.temp+'℃';
    document.querySelector('.hourly-forecast-temp2').innerText= forecaseDatas[1].main.temp+'℃';
    document.querySelector('.hourly-forecast-temp3').innerText= forecaseDatas[2].main.temp+'℃';
    document.querySelector('.hourly-forecast-temp4').innerText= forecaseDatas[3].main.temp+'℃';

}
// upcoming forecast view
async function updateUpcomingForecase(upcomingdata) {
    const {list} = upcomingdata;
    const upcomingforecastDatas= list
     dailyData= upcomingforecastDatas.filter(e=> e.dt_txt.split(' ')[1]==='00:00:00')
   
    // putting value by DOM

    document.querySelector('.up-forecast-time1').innerText= formatDate(dailyData[0].dt)
    document.querySelector('.up-forecast-time2').innerText= formatDate(dailyData[1].dt);
    document.querySelector('.up-forecast-time3').innerText= formatDate(dailyData[2].dt);
    document.querySelector('.up-forecast-time4').innerText= formatDate(dailyData[3].dt);


    document.querySelector('.up-forecast-img1').src= `https://openweathermap.org/img/w/${dailyData[0].weather[0].icon}.png`;
    document.querySelector('.up-forecast-img2').src= `https://openweathermap.org/img/w/${dailyData[1].weather[0].icon}.png`;
    document.querySelector('.up-forecast-img3').src= `https://openweathermap.org/img/w/${dailyData[2].weather[0].icon}.png`;
    document.getElementById('up-forecast-img4').src= `https://openweathermap.org/img/w/${dailyData[3].weather[0].icon}.png`;

    document.querySelector('.up-forecast-temp1').innerText= dailyData[0].main.temp+'℃';
    document.querySelector('.up-forecast-temp2').innerText= dailyData[1].main.temp+'℃';
    document.querySelector('.up-forecast-temp3').innerText= dailyData[2].main.temp+'℃';
    document.querySelector('.up-forecast-temp4').innerText= dailyData[3].main.temp+'℃';

}


// get location from search
async function getLocation(search) {
    let locationFetch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=3&appid=${API_KEY}`, {mode: 'cors'});
    let locationData = await locationFetch.json();
    return locationData
}

// search functionalities
async function handleSearch(value) {

    let locationArray= await getLocation(value).then(res=>{
        return res;
      })
    //   console.log(locationArray);
    const searchResultShow= document.querySelector('.search-result-list')
    searchResultShow.innerHTML= locationArray.map(item=>(
    `<div class=" d-flex result">
    <span class="d-flex justify-content-center align-items-center">
        <i class="fa fa-map-marker text-muted sun-icon" aria-hidden="true"></i>
    </span>
    <div class="ml-3 single-result-item" lat=${item.lat} city=${item.name} country=${item.country} lon=${item.lon}>
        <span>
            ${item.name}
        </span>
        <span class="text-muted mt-0">
            city/state from ${item.country}
            <span class='d-none'>lat=${item.lat} lon=${item.lon} </span>
        </span>
    </div>
    
</div>`
    )).join("")
    addClickevent()
}

const search = document.getElementById('search');
let search_term = '';
let searchtimer;
window.addEventListener("DOMContentLoaded", () => {
  search.addEventListener("input", (e) => {
    clearTimeout(searchtimer); 
    searchtimer = setTimeout(() => {
        search_term = e.target.value.toLowerCase();
        handleSearch(search_term)
         document.querySelector('.search-result-section').classList.remove('d-none')
    }, 500);
  });
});


// when search items are clicked

function addClickevent() {
    const clickedItem= document.querySelectorAll('.single-result-item')


       clickedItem.forEach(el=>{
        el.addEventListener("click", (e) => {
            // clearTimeout(searchtimer); 
            // searchtimer = setTimeout(() => {
               
            // }, 2000);
            let lat= e.target.parentElement.attributes[1].value
            let lon= e.target.parentElement.attributes[4].value
            let city= e.target.parentElement.attributes[2].value
            let country= e.target.parentElement.attributes[3].value
           defaultcity=city;
           defaultcountry=country;
           defaultlat=lat
           defaultlon=lon
            updateAfterSearch(city, country,lat, lon)
            document.getElementById('search').value=''
            search_term = '';
          });
       })
        
    
}

// after clicking on current location
const currentLocationBtn = document.getElementById('current-location');

window.addEventListener("DOMContentLoaded", () => {
    currentLocationBtn.addEventListener("click", (e) => {
        getLocation()
        function getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else { 
              alert('Geolocation is not supported by this browser.')
            }
          }
          
          function showPosition(position) {
            const lat= position.coords.latitude;
            const lon= position.coords.longitude;
            defaultlat=lat
            defaultlon=lon
            fetch('https://api.ipregistry.co/?key=3489kvz77p6qu0ho')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        defaultcity=payload.location.city
        defaultcountry= payload.location.country.code
        // console.log(payload.location.city + ', ' + payload.location.country.code);
        updateAfterSearch(payload.location.city, payload.location.country.code, lat, lon)
        currentLocationBtn.classList.add('btn-disable')
    });
          }
          
          function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            }
          }
   
  });
});

async function updateAfterSearch(city, country, lat, lon) {
  const getweatherData = await fetchApi(apiUrl.getDefaultWeather(lat, lon), function callback(data) {
    updateViewDisplay({ country: `${city + ', ' + country}`, lat, lon }, data, true);
  });
  await fetchApi(apiUrl.getAirPollution(lat, lon), function callback(airdata) {
      updateAirPollutionDataDisplay(false, airdata);
  });

  await fetchApi(apiUrl.getForecast(lat, lon), function callback(forecastdata) {
      updateHourlyForecaseDisplay(forecastdata);
  });

  await fetchApi(apiUrl.getForecast(lat, lon), function callback(upcomingdata) {
      updateUpcomingForecase(upcomingdata);
  });

  await document.querySelector('.search-result-section').classList.add('d-none');
  }


    // const getweatherData= await fetchApi(apiUrl.getDefaultWeather(lat, lon), function callback (data){
       
    //     updateViewDisplay({country:`${city +', '+country}`, lat, lon}, data,true);
    
    //    });
    //   await fetchApi(apiUrl.getAirPollution(lat, lon), function callback (airdata){
    //     updateAirPollutionDataDisplay(false, airdata);
    //    });
    
    //   await fetchApi(apiUrl.getForecast(lat, lon), function callback (forecastdata){
    //     updateHourlyForecaseDisplay(forecastdata);
    //     updateUpcomingForecase(forecastdata);
    //    });

    //    await document.querySelector('.search-result-section').classList.add('d-none');
//}


// filter functionalities
const futureDateCalculator=(count)=>{
    const today = new Date()
const date = new Date(today)
date.setHours(0,0,0,0)
 date.setDate(date.getDate() + count)
 date.toString().slice(0,10).split(' ')[1]
 return date.toString().slice(0,10).split(' ')[1] + ' '+ date.toString().slice(0,10).split(' ')[2];
}
async function updateAfterFilter(city, country, lat, lon) {
   
}
let filteredForecast=[]
let filteredAirForecast=[]
const updateFilter=(value=1,lat=defaultlat, lon=defaultlon,city=defaultcity, country=defaultcountry)=>{
//    console.log(filteredForecast);
document.getElementById('today-highlight-text').innerText='Day Highlight'

   if (filteredForecast.length>0) {
    // console.log('data ase');
    updateViewDisplay({country:city +', '+ country, lat: defaultlat, lon: defaultlon}, filteredForecast[value])

   }else{
    fetchApi(apiUrl.getForecast(lat, lon), function callback (forecastdata){
        const {list} = forecastdata;
    const upcomingforecastDatas= list
      filteredForecast= upcomingforecastDatas.filter(e=> e.dt_txt.split(' ')[1]==='00:00:00')
    //  console.log(filteredForecast);
    updateViewDisplay({country:city +', '+ country, lat: defaultlat, lon: defaultlon}, filteredForecast[value])

    fetchApi(apiUrl.getAirPollutionForecast(lat, lon), function callback (airdata){
        // updateAirPollutionDataDisplay(airdata)
        const {list} = airdata;
    const upcomingAirforecastDatas= list
    filteredAirForecast= upcomingAirforecastDatas.filter(e=> e.dt===filteredForecast[value].dt)
    updateAirPollutionDataDisplay(true, filteredAirForecast)
       });
   
       });
       
   }
      
}
const filterBtn1= document.getElementById('filter1')
const filterBtn2= document.getElementById('filter2')
const filterBtn3= document.getElementById('filter3')
const filterBtn4= document.getElementById('filter4')
// filterBtn1.innerText=(futureDateCalculator(1))
// filterBtn2.innerText=(futureDateCalculator(2))
// filterBtn3.innerText=(futureDateCalculator(3))
// filterBtn4.innerText=(futureDateCalculator(4))

filterBtn1.addEventListener('click', ()=>updateFilter2(0))
filterBtn2.addEventListener('click', ()=>updateFilter2(1))
filterBtn3.addEventListener('click', ()=>updateFilter2(2))
filterBtn4.addEventListener('click', ()=>updateFilter2(3))

const updateFilter2=(value=1,lat=defaultlat, lon=defaultlon,city=defaultcity, country=defaultcountry)=>{
$(".upcoming-forecast").hide().slice(0, value + 1).show();


}

// initial function call when app opens
async function pageOpen() {

    // getting current location
    getLocation()
        function getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else { 
              alert('Geolocation is not supported by this browser.')
            }
          }
          
          function showPosition(position) {
            const lat= position.coords.latitude;
            const lon= position.coords.longitude;
            defaultlat=lat
            defaultlon=lon
            fetch('https://api.ipregistry.co/?key=3489kvz77p6qu0ho')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        defaultcity=payload.location.city
        defaultcountry= payload.location.country.code
        // console.log(payload.location.city + ', ' + payload.location.country.code);
        updateAfterSearch(payload.location.city, payload.location.country.code, lat, lon)
        currentLocationBtn.classList.add('btn-disable')
    });
          }
          
          function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            }
          }



   const getweatherData= fetchApi(apiUrl.getDefaultWeather(defaultlat, defaultlon), function callback (data){
    // return data;
    // console.log(data)
    updateViewDisplay({country:'Lisbon, PT', lat: defaultlat, lon: defaultlon}, data)

   });
   fetchApi(apiUrl.getAirPollution(defaultlat, defaultlon), function callback (airdata){
    updateAirPollutionDataDisplay(false, airdata)
   });

   fetchApi(apiUrl.getForecast(defaultlat, defaultlon), function callback (forecastdata){
    updateHourlyForecaseDisplay(forecastdata)
    updateUpcomingForecase(forecastdata)
   });

  
}
pageOpen();

document.getElementById('logo').addEventListener('click', ()=>pageOpen())