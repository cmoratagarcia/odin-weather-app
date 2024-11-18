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

let info = {
  address: "",
  conditions: "",
  celsius: "",
  fahrenheit: "",
  isMetric: true,
  description: "",
};

form.addEventListener("submit", getQuery);
submitBtn.addEventListener("click", getQuery);
celsiusBtn.addEventListener("click", console.log("C"));
fahrenheitBtn.addEventListener("click", console.log("F"));

function getQuery(event) {
  event.preventDefault();
  let city = searchBox.value;
  fetchWeatherData(city);
}

function renderResults() {
  resultsTitle.innerText = info.address;

  condItem.innerText = `Weather: ${info.conditions}`;

  tempItem.innerText = `Temperature: ${
    info.isMetric ? info.celsius : info.fahrenheit
  }`;

  descrItem.innerText = `Forecast: ${info.description}`;
  results.style.display = "block";
}
//You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather

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
      info.address = response.resolvedAddress;
      info.conditions = response.currentConditions.conditions;
      info.celsius = `${response.currentConditions.temp} °C`;
      info.fahrenheit = `${convertToFahrenheit(
        response.currentConditions.temp
      )} °F`;
      info.isMetric = true;
      info.description = response.description;
      console.log(info);
      renderResults();
    });
  //catch errors
}
