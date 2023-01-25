$(document).ready(function () {

    var today = moment.locale('en-gb');
    var today = moment().format('L');
    // start the url and concatenate with key to create a call
    // both are empty for now, but can build in the response function when looping data
    var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    var apiURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}';
    var key = 'd061286c4d7491a48e28c06cc0a8a6b6';
    // may need lat and lon variables
    var lon;
    var lat;
    var location = '';
    var searchString = '';
    var queryURL;

    // add event listener for the search button
    $('#search-button').on('click', function (){
        event.preventDefault();
        searchString = $('#search-input').val();
        geoCode = geoURL + searchString + '&limit=1&appid=' + key;
        // searchString = $('#search-input').val();
        // queryURL = apiURL + searchString + '&appid=' + key;
        
        console.log(queryURL);
        console.log(geoCode);

    // To use geocode API to get lon and lat from city search
    $.ajax({
        url:geoCode,
        method: 'GET'
    }).then(function (startResponse) {

        lat = startResponse[0].lat;
        lon = startResponse[0].lon;
        console.log('this is the lat ' + lat + ' this is the lon ' + lon)
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(response);

    });


    });

    // function to go through the data and create elements
    function response() {
        console.log('button clicked');
        

        // test some responses and log to console

    }

// Identify Search parameters - lon and lat, city, weather icon?, temp, wind, humidity

// Moment.js for current day - and next five days

// List the previous searched cities - using local storage
console.log(today);
});