$(document).ready(function () {

    var todaysDate = moment.locale('en-gb');
    var todaysDate = moment().format('L');
    var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?';
    var key = 'd061286c4d7491a48e28c06cc0a8a6b6';
    // may need lat and lon variables
    var lon;
    var lat;
    var location = '';
    var searchString = '';
    var queryURL;

    // add event listener for the search button
    $('#search-button').on('click', function () {
        event.preventDefault();
        searchString = $('#search-input').val();
        geoCode = geoURL + searchString + '&limit=1&appid=' + key;

        // To use geocode API to get lon and lat from city search -parse the results to the next ajax query
        $.ajax({
            url: geoCode,
            method: 'GET'
        }).then(function (startResponse) {

            lat = startResponse[0].lat;
            lon = startResponse[0].lon;
            console.log('this is the lat ' + lat + ' this is the lon ' + lon);
            queryURL = apiURL + 'lat=' + lat + '&lon=' + lon + '&appid=' + key;

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (fullResponse) {
                console.log(fullResponse.list[0].main.temp);
                var forecastToday = $('<div>');
                forecastToday.text(fullResponse.list[0].main.temp);

                //append items
                $('#today').append(forecastToday);
            });

        });


    });

    // // function to go through the data and create elements
    // function fullResponse() {

    //     // print the response - either in console log or to html using json stringify
    //     console.log('button clicked');
    //     console.log(fullResponse);


    // }

    // Identify Search parameters - lon and lat, city, weather icon?, temp, wind, humidity

    // List the previous searched cities - using local storage
    console.log(todaysDate);


});
