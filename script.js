const form = document.getElementById("form");
const searchBox = document.getElementById("search-box");
const submitBtn = document.getElementById("submit-btn");
const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");
const results = document.querySelector(".results");
const resultsHeader = document.querySelector(".results-header");
const resultsTitle = document.querySelector(".results-title");
const condItem = document.querySelector(".conditions");
const tempItem = document.querySelector(".temperature");
const descrItem = document.querySelector(".description");

form.addEventListener("submit", getQuery);
submitBtn.addEventListener("click", getQuery);
celsiusBtn.addEventListener("click", console.log("C"));
fahrenheitBtn.addEventListener("click", console.log("F"));

function getQuery(event) {
  event.preventDefault();
  let city = searchBox.value;
  fetchWeatherData(city);
}

function renderResults(address, conditions, temperature, unit, description) {
  resultsTitle.innerText = address;

  condItem.innerText = `Weather: ${conditions}`;

  tempItem.innerText =
    `Temperature: ${temperature}` + `${unit === "°C" ? "°C" : "°F"}`;

  descrItem.innerText = `Forecast: ${description}`;
  results.style.display = "block";
}

function convertToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

function fetchWeatherData(location) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZBZPAPPSJEVGRLW8AU8DAEBCT&contentType=json`,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    //Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
    .then((response) => {
      console.log(response);
      let info = {};
      //Could change this to a class constructor to allow for future expansions
      info.address = response.resolvedAddress;
      info.conditions = response.currentConditions.conditions;
      info.temperature = response.currentConditions.temp;
      info.unit = "°C";
      info.description = response.description;
      renderResults(
        info.address,
        info.conditions,
        info.temperature,
        info.unit,
        info.description
      );
    });
  //catch errors
}
