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
function renderResults(conditions, temperature) {
  results.innerHTML = "";
  const condPara = document.createElement("p");
  condPara.classList.add("results-item");
  condPara.innerText = `Weather: ${conditions}`;
  results.appendChild(condPara);

  const tempPara = document.createElement("p");
  tempPara.classList.add("results-item");
  tempPara.innerText = `Temperature: ${temperature}`;
  results.appendChild(tempPara);
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
      let info = {};
      info.conditions = response.currentConditions.conditions;
      info.temperature = response.currentConditions.temp;
      renderResults(info.conditions, info.temperature);
    });
}
