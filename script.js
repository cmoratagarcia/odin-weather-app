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
  celsius: 0,
  fahrenheit: 0,
  isMetric: true,
  description: "",
};

const backgrounds = {
  Sunny: "url('./Assets/sunny.jpg')",
  Clear: "url('./Assets/clear.jpg')",
  Overcast: "url('./Assets/overcast.jpg')",
  "Partially cloudy": "url('./Assets/partially-cloudy.jpg')",
  Rain: "url('./Assets/rainy.jpg')",
  Snow: "url('./Assets/snowy.jpg')",
};

form.addEventListener("submit", getQuery);
submitBtn.addEventListener("click", getQuery);
celsiusBtn.addEventListener("click", switchToCelsius);
fahrenheitBtn.addEventListener("click", switchToFahrenheit);

function getQuery(event) {
  event.preventDefault();
  let city = searchBox.value;
  fetchWeatherData(city);
}

function renderResults() {
  const errorPara = document.querySelector(".results-error");
  errorPara.remove();

  resultsTitle.innerText = info.address;

  condItem.innerText = `Weather: ${info.conditions}`;
  changeBackground(info.conditions);

  tempItem.innerText = `Temperature: ${
    info.isMetric ? `${info.celsius} °C` : `${info.fahrenheit} °F`
  }`;

  descrItem.innerText = `Forecast: ${info.description}`;
  results.style.display = "flex";
  document.body.style.flexDirection = "column";
}

function changeBackground(condition) {
  const backgroundImg = backgrounds[condition] || "none";

  document.body.style.backgroundImage = backgroundImg;
}
//You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather
function switchToCelsius() {
  info.isMetric = true;
  renderResults();
}

function switchToFahrenheit() {
  info.isMetric = false;
  renderResults();
}

function displayError() {
  let errorPara = document.createElement("p");
  errorPara.innerText = "Error. Please enter a valid location";

  errorPara.classList.add("results-error");
  document.body.appendChild(errorPara);

  results.style.display = "none";
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
      info.address = response.resolvedAddress;
      info.conditions = response.currentConditions.conditions;
      info.celsius = response.currentConditions.temp;
      info.fahrenheit = (response.currentConditions.temp * 9) / 5 + 32;
      info.description = response.description;

      renderResults();
    })
    .catch((error) => {
      displayError();
    });
}
