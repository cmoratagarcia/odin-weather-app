function fetchWeatherData(location) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=ZBZPAPPSJEVGRLW8AU8DAEBCT`,
    { mode: "cors" }
  );
}
