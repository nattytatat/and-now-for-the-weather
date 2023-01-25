$(document).ready(function () {

    // start the url and concatenate with key to create a call
    // both are empty for now, but can build in the response function when looping data
    var apiURL = '';
    var key = '';
    var searchString = '';
    var queryURL;

    // API call - call data using AJAX
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(response);

    // function to go through the data and create elements
    function response() {

    }

// Identify Search parameters - lon and lat, city, weather icon?, temp, wind, humidity

// Moment.js for current day - and next five days

// List the previous searched cities - using local storage

});