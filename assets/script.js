$(document).ready(function () {

    // start the url and concatenate with key to create a call
    // both are empty for now, but can build in the response function when looping data
    // var apiURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}';
    var apiURL = 'test.com/';
    var key = 'd061286c4d7491a48e28c06cc0a8a6b6';
    // may need lat and lon variables
    var lon = '';
    var lat = '';
    var searchString = '';
    var queryURL;

    // add event listener for the search button
    $('#search-button').on('click', function (){
        event.preventDefault();
        searchString = $('#search-input').val();
        queryURL = apiURL + searchString + '&appid=' + key;
        
        console.log(queryURL);


   // API call - call data using AJAX
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(response);

    });

    // function to go through the data and create elements
    function response() {
        console.log('button clicked');

    }

// Identify Search parameters - lon and lat, city, weather icon?, temp, wind, humidity

// Moment.js for current day - and next five days

// List the previous searched cities - using local storage

});