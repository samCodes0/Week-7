let weatherUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast';
let weatherDataTable = document.querySelector('#weather-forecast');

// fetch returns a promise
fetch(weatherUrl).then(function(response) {
    return response.json(); // converting the response from bytes to JSON
    // this is another promise so anything returned here needs another then

}).then(function(actualJsonData) {
    let propertiesObject = actualJsonData.properties;
    let periodsArray = propertiesObject.periods;

    periodsArray.forEach(function(oneForecastPeriodObject){
        let forecastPeriod = oneForecastPeriodObject.name;
        let temperature = oneForecastPeriodObject.temperature;
        let tempUnit = oneForecastPeriodObject.temperatureUnit;
        let forecastIcon = oneForecastPeriodObject.icon;
        let forecastDetails = oneForecastPeriodObject.detailedForecast;

        let newTableRow = document.createElement('tr');
        let timeTableData = document.createElement('td');
        let tempTableData = document.createElement('td');
        let iconTableData = document.createElement('td');
        let detailsTableData = document.createElement('td');

        timeTableData.innerHTML = forecastPeriod;
        tempTableData.innerHTML = `${temperature} ${tempUnit}`;
        iconTableData.innerHTML = `<img src=${forecastIcon}>`;
        detailsTableData.innerHTML = forecastDetails;

        newTableRow.appendChild(timeTableData);
        newTableRow.appendChild(tempTableData);
        newTableRow.appendChild(iconTableData);
        newTableRow.appendChild(detailsTableData);
        weatherDataTable.appendChild(newTableRow);
    })
})