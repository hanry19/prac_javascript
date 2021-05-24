const weather = document.querySelector(".js-weather");

const API_KEY = "2b3481bcac08c45cb26aac53ad938f7b";
const COORDS = 'coords';

function getWeather(lat,lon) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
  
        //Weather API를 통해 받아온 body 값은 response.json()에 존재한다.
        //response는 header, status 값들에 대한 내용만 보임
        return response.json();
    })
  
    .then(function(json){
      //우리가 얻고자하는 실제 body 값
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
      console.log(json)
    });
  
  }


function saveCoords(coordsObj) {

    //localStorage에는 항상 String 형식으로 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
  }
  

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      // latitude: latitude,
      // ES6 문법
      latitude,
      longitude
    }
  
    //localStorage 에 저장
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
  }
  
  function handleGeoError(){
    console.log('Cant access');
  }
  
  function askForCoords() {
    
    //좌표를 호출하는 객체
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
  }
  


function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS)
    if(loadCoords === null){
        askForCoords();
    } else {
      const parseCoords = JSON.parse(loadCoords)
      getWeather(parseCoords.latitude,parseCoords.longitude);
    }
  }
  
  function init() {
    loadCoords();
  }
  

init();