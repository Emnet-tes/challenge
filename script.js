
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
    let apiurl = `https://api.shecodes.io/weather/v1/current?query=${phew.value}&key=${key}&inits=metric`;

    function show(response) {
        function getforecast(coorinates) {
            api = `https://api.shecodes.io/weather/v1/forecast?lon=${coorinates.longitude}&lat=${coorinates.latitude}&key=${key}&units=metric`;
            axios.get(api).then(displayforecast);
        }
        //temprature of the country
        let temp = Math.round(response.data.temperature.current);
        let iconElement = document.querySelector("#icon");
        let image = response.data.condition.icon;
        iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${image}.png`);
        let h1 = document.querySelector(".fa");
        h1.innerHTML = ` ${temp}`;

        getforecast(response.data.coordinates);

        //discription about the temprature
        let report = response.data.condition.description;
        let explain = document.querySelector(".report");
        explain.innerHTML = `${report}`;
       
        //humidity of the country
        let humi = response.data.temperature.humidity;
        let humidity = document.querySelector(".hum");
        humidity.innerHTML = `Humidity: ${humi}%`;
       
        //wind speed of the country
        let wind = Math.round(response.data.wind.speed);
        let speed = document.querySelector(".wind");
        speed.innerHTML = `Wind: ${wind} km/h`
    }
    axios.get(`${apiurl}`).then(show);

    function dayformat(timestamp) {
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day];
    }

    //daily forecast    
    function displayforecast(response) {

        let forecastday = response.data.daily;
        let forecast = document.querySelector("#forecast");
        let forecasthtml = `<div class="row" id="forecast">`;
        forecastday.forEach(function (daily, index) {
            if (index < 6) {
                forecasthtml += `
          <div class="col-2">
            <div class="forecast-date">
              ${dayformat(daily.time)}
            </div>
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${daily.condition
                        .icon}.png" alt="" class="bottomicon"  width="36"  />
              <div class="temp-range">
                <span class="max">${Math.round(daily.temperature.maximum)}°</span>
            <span class="min">${Math.round(daily.temperature.minimum)}°</span>
              </div>
            </div>
        `;
            }
        }
        )
        forecasthtml += `</div>`;
        forecast.innerHTML = forecasthtml;

    }
}

city.addEventListener("click", display);
let key = "a4a4df436f63o622062tf5b03c2acdbf";


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
