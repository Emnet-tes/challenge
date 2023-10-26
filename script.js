

//feature 1
let boom = new Date();
let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let day = days[boom.getDay()];
let hour = boom.getHours();
let minutes = boom.getMinutes();
if (hour < 10) {
    hour = "0" + boom.getHours();
} else {
    hour = boom.getHours();
}
if (minutes < 10) {
    minutes = "0" + boom.getMinutes();
} else {
    minutes = boom.getMinutes();
}
let p = document.querySelector(".time");
p.innerHTML = `Last updated :${day} ${hour}:${minutes}`;

let city = document.querySelector(".mb-3");
function display(event) {
    event.preventDefault();

    let phew = document.querySelector("#pak");
    let cities = document.querySelector("h5");

    cities.innerHTML = phew.value;
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${phew.value}&appid=${key}&units=metric`

    function show(response) {
        //temprature of the country
        let temp = Math.round(response.data.main.temp);
        console.log(response.data);
        console.log(`${response.data.main.temp}`);
        let iconElement = document.querySelector("#icon");
        let image = response.data.weather[0].icon;
        iconElement.setAttribute("src",
            `http://openweathermap.org/img/wn/${image}@2x.png`
        );
        let h1 = document.querySelector(".fa");
        h1.innerHTML = ` ${temp}`;
        displayforecast();
        //discription about the temprature
        let report = response.data.weather[0].description;
        let explain = document.querySelector(".report");
        explain.innerHTML = `${report}`;
        //humidity of the country
        let humi = response.data.main.humidity;
        let humidity = document.querySelector(".hum");
        humidity.innerHTML = `Humidity:${humi}%`;
        //wind speed of the country
        let wind = Math.round(response.data.wind.speed);
        let speed = document.querySelector(".wind");
        speed.innerHTML = `Wind:${wind} km/h`
    }
    axios.get(`${apiurl}`).then(show);
    function displayforecast() {
        let forecast = document.querySelector("#forecast");
        let forecasthtml = `<div class="row" id="forecast">`;
        let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
        days.forEach(function (day) {

            forecasthtml += `
          <div class="col-2">
            <div class="forecast-date">
              ${day}
            </div>
            <img
              src="http://openweathermap.org/img/wn/50d@2x.png" alt="" class="bottomicon"  width="36"  />
              <div class="temp-range">
                <span class="max">17°</span>
            <span class="min">12°</span>
              </div>
            </div>
        `;

        });
        forecasthtml += `</div>`;
        forecast.innerHTML = forecasthtml;

    }
}

city.addEventListener("click", display);


let key = "82105329264a81552281d1bba61e049b";

//current location
let current = document.querySelector(".btn-success");
function showcurrent(event) {
    event.preventDefault();
    function getcurrent(position) {
        alert(`${position.coords.latitude} ${position.coords.longitude}`)
    }
    navigator.geolocation.getCurrentPosition(getcurrent);
}
current.addEventListener("click", showcurrent);
//fharinite converter
let fharanite = document.querySelector(".far-link");
function fharaniteconverter(event) {
    event.preventDefault();
    let temp = document.querySelector(".fa").textContent;
    let tempp = ((parseFloat(temp) * 9 / 5) + 32);
    console.log(tempp);
    document.querySelector(".fa").textContent = tempp;

}
fharanite.addEventListener("click", fharaniteconverter);
//celcius convertetr
let celcius = document.querySelector(".cel-link");
function celciusconverter() {
    let temp = document.querySelector(".fa").textContent;
    let tempp = ((parseFloat(temp) - 32) * 5 / 9);
    document.querySelector(".fa").textContent = tempp;
}
celcius.addEventListener("click", celciusconverter);
