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
celsiusBtn.addEventListener("click", switchToCelsius);
fahrenheitBtn.addEventListener("click", switchToFahrenheit);

//Get data from search box on form submit
function getQuery(event) {
  event.preventDefault();
  let city = searchBox.value;
  fetchWeatherData(city);
}

//Display results
function renderResults() {
  const errorPara = document.querySelector(".results-error");
  if (errorPara) {
    errorPara.remove();
  }

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
//Change the look of the page based on the data (project requirement)
function changeBackground(condition) {
  const backgroundImg = backgrounds[condition] || "none";

  document.body.style.backgroundImage = backgroundImg;
}

//Highlight selected temp button
function changeTempButton(metric) {
  if (metric) {
    celsiusBtn.classList.add("selected");
    fahrenheitBtn.classList.remove("selected");
  } else {
    celsiusBtn.classList.remove("selected");
    fahrenheitBtn.classList.add("selected");
  }
}

function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

//Toggle temp value and unit between F and C
function switchToCelsius() {
  info.isMetric = true;
  changeTempButton(info.isMetric);
  renderResults();
}

function switchToFahrenheit() {
  info.isMetric = false;
  changeTempButton(info.isMetric);
  renderResults();
}

//Display error message on form submit
function handleError(error) {
  const existingError = document.querySelector(".results-error");
  if (existingError) existingError.remove(); // Remove old error message to prevent multiples

  const errorPara = document.createElement("p");
  errorPara.classList.add("results-error");

  // Customized error messages based on status codes
  switch (error.message) {
    case "400":
      errorPara.innerText = "Please enter a valid location.";
      break;
    case "401":
      errorPara.innerText =
        "Unauthorized: Please check your API key or account status.";
      break;
    case "429":
      errorPara.innerText =
        "Too Many Requests: You have exceeded your API limits. Please try again later.";
      break;
    case "500":
      errorPara.innerText =
        "Server Error: The weather service is currently unavailable. Please try again later.";
      break;
    default:
      errorPara.innerText = "An unexpected error occurred. Please try again.";
  }

  document.body.appendChild(errorPara);
  results.style.display = "none";
}

//Fetch data from API
function fetchWeatherData(location) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZBZPAPPSJEVGRLW8AU8DAEBCT&contentType=json`,
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        // Handle HTTP errors by throwing an error with status
        throw new Error(response.status);
      }
      return response.json();
    })
    //Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
    .then((response) => {
      info.address = response.resolvedAddress;
      info.conditions = response.currentConditions.conditions;
      info.celsius = response.currentConditions.temp;
      info.fahrenheit = convertToFahrenheit(info.celsius);
      info.description = response.description;

      renderResults();
    })
    .catch((error) => {
      handleError(error);
    });
}
