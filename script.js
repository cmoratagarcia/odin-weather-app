const form = document.getElementById("form");
const searchBox = document.getElementById("search-box");
const button = document.querySelector("button");
const results = document.querySelector(".results");

form.addEventListener("submit", getQuery);

button.addEventListener("click", getQuery);

function getQuery(event) {
  event.preventDefault();
  let city = searchBox.value;
  fetchWeatherData(city);
}
function renderResults(address, conditions, temperature, unit, description) {
  results.innerHTML = "";

  const resultsTitle = document.createElement("h2");
  resultsTitle.classList.add("results-title");
  resultsTitle.innerText = address;
  results.appendChild(resultsTitle);

  const condPara = document.createElement("p");
  condPara.classList.add("results-item");
  condPara.innerText = `Weather: ${conditions}`;
  results.appendChild(condPara);

  const tempPara = document.createElement("p");
  tempPara.classList.add("results-item");
  tempPara.innerText =
    `Temperature: ${temperature}` + `${unit === "°C" ? "°C" : "°F"}`;
  results.appendChild(tempPara);

  const descrPara = document.createElement("p");
  descrPara.classList.add("results-item");
  descrPara.innerText = `Forecast: ${description}`;
  results.appendChild(descrPara);
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
