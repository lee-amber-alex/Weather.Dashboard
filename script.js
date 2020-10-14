$(document).ready(function () {
  let dateEl = $("#date");
  let cityNameEl = $("#cityName");
  let tempEl = $("#temp");
  let humidityEl = $("#humidity");
  let uvEl = $("#UV");
  let iconEl = $("#icon");
  let weatherBlockEl = $("#weatherBlock");
  let windEl = $("#wind");
  let searchCityEl = $("#searchCity");
  let citySearchEl = $("#citySearch");
  let timeNow = moment().format("lll");
  let goodWeather = "http://gph.is/2c9knpp";
  let weatherHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  function renderSavedbuttons() {
    $("#saved-search").empty();
    let filteredHistory = new Set(weatherHistory);
    filteredHistory.forEach(function (cityName, i) {
      if (i > 4) return;
      console.log(cityName);
      console.log(i);
      let a = $("<button>");
      a.addClass("saved-search");
      a.text(cityName);
      $("#saved-search").prepend(a);
    });
  }
  function buildQueryURL(queryParams) {
    let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";

    if (queryParams === "") {
      return buildQueryURL();
    }

    weatherHistory.push(queryParams);
    localStorage.setItem("weatherHistory", JSON.stringify(weatherHistory));
    renderSavedbuttons();
    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      queryParams +
      apiKeyEl;
    return queryURL;
  }
  function buildQueryURL5(queryParams) {
    // $("table").empty();
    let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";

    let queryURL5 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      queryParams +
      apiKeyEl;
    return queryURL5;
  }
  function handleSearch(queryParams) {
    let queryURL = buildQueryURL(queryParams);

    $.ajax({
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
      // UV function here__________

      console.log(iconEl.val(results.weather[0]));

      // localStorage.setItem("weatherHistory", weatherHistory);
    });
    function convertKtoF(tempInKelvin) {
      return (Math.floor(tempInKelvin - 273.15) * 9) / 5 + 32;
    }

    let queryURL5 = buildQueryURL5(queryParams);

    let fiveDay = $.ajax({
      url: queryURL5,
      method: "GET",
    }).then(function (response) {
      let fiveDayrep = response;
      $("tbody").empty();
      fiveDaytempTiDay = $("<th>" + "Date" + "<th>");
      fiveDaytempTiTemp = $("<th>" + "Temperature" + "<th>");
      fiveDaytempTHum = $("<th>" + "Humidity" + "<th>");
      fiveDaytempTWind = $("<th>" + "Windspeed" + "<th>");
      fiveDaytempTUV = $("<th>" + "UV" + "<th>");

      $("tbody").append(
        fiveDaytempTiDay,
        fiveDaytempTiTemp,
        fiveDaytempTHum,
        fiveDaytempTWind,
        fiveDaytempTUV
      );
      for (let i = 0; i < fiveDayrep.list.length; i++) {
        if (i % 8 === 0) {
          let tRow = $("<tr>");
          fiveDayDate = $("<td>" + fiveDayrep.list[i].dt + "<td>");
          fiveDayTemp = $(
            "<td>" +
              convertKtoF(parseFloat(fiveDayrep.list[i].main.temp)) +
              "&deg;F" +
              "<td>"
          );
          fiveDayHum = $(
            "<td>" + fiveDayrep.list[i].main.humidity + "%" + "<td>"
          );
          fiveDayWind = $(
            "<td>" + fiveDayrep.list[i].wind.speed + "m/s" + "<td>"
          );
          tRow.append(fiveDayDate, fiveDayTemp, fiveDayHum, fiveDayWind);
          $("tbody").append(tRow);
        }
      }
      console.log(fiveDayrep.list[0].main.temp);
      console.log(fiveDayrep);

      localStorage.setItem("fiveDay", fiveDay);
    });
  };
  $("#searchCity").on("click", function (event) {
    event.preventDefault();
    let queryParams = $("#citySearch").val().trim();
    handleSearch(queryParams);
  });
  // adding a click handle to a dynamic element requires a workaround.
  $("#saved-search").on("click", ".saved-search", function (event) {
    event.preventDefault();
    console.log($(this).text());
    let queryParams = $(this).text();
  
    handleSearch(queryParams);
  });
  dateEl.append(timeNow);
  renderSavedbuttons();
});


// uvEl.text(response.uv)   NEED TO FIND THIS INFORMATION;
// let latEl = results.coord.lat;
// let lonEl = results.coord.lon;
// console.log(results.coord.lat);
// let apiKeyEl = "&appid=0c4095be8ee8948edd8333313900b9cb";
// let queryURLuv =
//   "http://api.openweathermap.org/data/2.5/uvi?lat=" +
//   latEl +
//   "&lon=" +
//   lonEl +
//   "&appid=" +
//   apiKeyEl;
// $.ajax({
//   url: queryURLuv,
//   method: "GET",
// }).then(function (responseUV) {
//   console.log(responseUV);
//   uvEl.text(responseUV.name);
// });

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
