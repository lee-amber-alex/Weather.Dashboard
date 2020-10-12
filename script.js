let dateEl = $("#date");
let cityNameEl = $("#cityName");
let tempEl = $("#temp");
let humidityEl = $("#humidity");
let uvEl = $("#UV");
let weatherBlockEl = $("#weatherBlock");
let windEl = $("#wind");
let searchCityEl = $("#searchCity");
let citySearchEl = $("#citySearch");
let timeNow = moment().format("lll");
let goodWeather = "http://gph.is/2c9knpp";

dateEl.append(timeNow);

function buildQueryURL() {
  let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";
  let queryParams = $("#citySearch").val().trim();
  let a = $("<button>");
  a.addClass("saved-search");
  a.text(queryParams);
  $("#saved-search").append(a);
  console.log(a);
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryParams +
    apiKeyEl;
  return queryURL;
}
function buildQueryURL5() {
  let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";
  let queryParams = $("#citySearch").val().trim();
  let queryURL5 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    queryParams +
    apiKeyEl;
  return queryURL5;
}

$("#searchCity").on("click", function initialSearch(event) {
  event.preventDefault();
  let queryURL = buildQueryURL();

  let weatherHistory = $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    const results = response;
    console.log(results);

    cityNameEl.text(results.name);

    tempEl.html(
      "Temperature: " + convertKtoF(parseFloat(results.main.temp)) + "&deg;F"
    );
    humidityEl.text("Humidity: " + results.main.humidity + "%");
    windEl.text("Windspeed: " + results.wind.speed + "m/s");

    // uvEl.text(response.uv)   NEED TO FIND THIS INFORMATION;
    // let latEl = results.coord.lat;
    // let lonEl = results.coord.lon;
    // console.log(results.coord.lat);
    localStorage.setItem("weatherHistory", weatherHistory);

    let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";
    let queryURLuv =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      latEl +
      "&lon=" +
      lonEl +
      "&appid=" +
      apiKeyEl;
    $.ajax({
      url: queryURLuv,
      method: "GET",
    }).then(function (responseUV) {
      console.log(responseUV);
      uvEl.text(responseUV.name);
    });
  });
  function convertKtoF(tempInKelvin) {
    return (Math.floor(tempInKelvin - 273.15) * 9) / 5 + 32;
  }

  let queryURL5 = buildQueryURL5();
  let fiveDay = $.ajax({
    url: queryURL5,
    method: "GET",
  }).then(function (response) {
    let fiveDayrep = response;
    console.log(fiveDayrep);
    localStorage.setItem("fiveDay", fiveDay);
  });
});


$(document).on("click", "#saved-search", initialSearch);
buildQueryURL();

// function renderButtons() {
//   $("#buttons-view").empty();
// }
// let savedWeather = JSON.parse(localStorage.getItem(weatherHistory))

// Enter city and click search
// City weather populates below
// City Name
// Temp
// Humidity
// Wind
// UV
// Icon for weather conditions
// Color that indicates good or bad
// 5 day forecast populates below
// / City Name
// Temp
// Humidity
// Wind
// UV
// Icon for weather conditions
// Color that indicates good or bad
// Enter additional city and click search
// Previous city button populates a the top above City name
// Click on button and previous information displayed
