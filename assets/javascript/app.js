// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// APP DATA
const weather = {};
weather.temperature = {
    unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "3a1348383a7ad0855242e55cee3a7f23";
const key2 = "200705616-691135a1c37048aca9594476cc41aee8";

// GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    getHiking(latitude, longitude);
}

// SHOW ERROR - WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F Conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

// FUNCTION TO PUSH TOP 6 TRAILS FROM USER LOCATION
function getHiking(latitude, longitude) {
    let api2 = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${key2}`;

    $.ajax({
        url: api2,
        method: "GET"
    })
        .then(function (response) {
            for (i = 0; i < 8; i++) {

                // CONSTANTS FOR RESPONSE DATA
                const trailname = response.trails[i].name;
                const summary = response.trails[i].summary;
                const difficulty = response.trails[i].difficulty;
                const stars = response.trails[i].stars;
                const imgurl = response.trails[i].imgSmallMed;
                const phurl = "this.src ='https://cdn.pixabay.com/photo/2018/01/05/23/50/wood-3064114_960_720.jpg';"
                const turl = response.trails[i].url;
                // CONSTANTS FOR RESPONSE DATA
                const trailcard = $("<div class=card>");
                trailcard.attr("class", "card col-9 col-sm-6 col-md-3 col-lg-2 col-xl-2")
                const trailnamep = $("<h5>").text("Trail Name: " + trailname);
                trailnamep.attr("class", "card-title");
                const difficultyp = $("<h6>").text("Difficulty: " + difficulty);
                difficultyp.attr("class", "card-title");
                const starsp = $("<h6>").text("Rating: " + stars);
                starsp.attr("class", "card-title");
                const summaryp = $("<p>").text("Summary: " + summary);
                summaryp.attr("class", "card-text");
                const imgp = $("<img>");
                imgp.attr("src", imgurl);
                imgp.attr("onerror", phurl);
                imgp.attr("class", "img-fluid");
                const butp = $("<a>").text("More info");
                butp.attr("class", "btn btn-primary")
                butp.attr("href", turl)
                butp.attr("target", "_blank")
                trailcard.append(trailnamep, trailnamep, summaryp, difficultyp, starsp, imgp, butp)
                $("#Lyyte").append(trailcard);
            }
        });
};
