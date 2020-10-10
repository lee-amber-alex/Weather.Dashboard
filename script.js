let dateEl = $("#date");
let cityNameEl= $("#cityName");
let tempEl= $("#temp");
let humidityEl= $("#humidity");
let uvEl= $("#UV");

let windEl = $("#wind");
let searchCityEl = $("#searchCity");
let citySearchEl = $("#citySearch");
let timeNow = moment().format("lll");

dateEl.append(timeNow);

function buildQueryURL(){


let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";
let queryParams= $("#citySearch").val().trim();
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryParams + apiKeyEl;


console.log("This is where user writes input", $("#citySearch"))
console.log("this is query url", queryURL);
console.log("query user input", queryParams);

return queryURL; 
};


$("#searchCity").on("click", function(event){
event.preventDefault();

let queryURL= buildQueryURL();

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
const results = response;
console.log(response);
cityNameEl.text(response.name);
tempEl.html("Temperature: " + convertKtoF(parseFloat( response.main.temp)) + "&deg;F");
humidityEl.text("Humidity: " + response.main.humidity + "%");
windEl.text("Windspeed: " + response.wind.speed + "m/s");
// uvEl.text(response.uv)   NEED TO FIND THIS INFORMATION;

});
function convertKtoF(tempInKelvin) {
  // (360K − 273.15) × 9/5 + 32 = 188.33°F
  return ((tempInKelvin - 273.15) * 9) / 5 + 32;
};

});


// for (var i = 0; i < results.legnth; i++){
// let cityName = $("<div>");
// let p = $("<p>").text(results[i].temperature);
// let weatherCondition = $("<img>");