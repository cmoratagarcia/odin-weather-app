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
      console.log(response.currentConditions.conditions);
      console.log(response.currentConditions.temp);
    });
}

fetchWeatherData("Madrid");
