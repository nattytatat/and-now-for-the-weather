var todaysDate = moment().format('DD/MM/YYYY');
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
var mainURL = 'https://api.openweathermap.org/data/2.5/forecast?';
var key = '&appid=d061286c4d7491a48e28c06cc0a8a6b6';
var searchString;

// add geolocation query in this function so it can be called for current and previous searches
function buildQuery() {
    queryURL = apiURL + 'q=' + searchString + key;

    // first AJAX call to parse the data from lat and lon values
    $.ajax({
        url: queryURL,
        method: 'GET'

    }).then(function (firstResponse) {

        // grab lat and lon values
        var lat = firstResponse.coord.lat;
        var lon = firstResponse.coord.lon;
        //then build full URL for weather search
        var fullURL = mainURL + 'lat=' + lat + '&lon=' + lon + key;

        //run next AJAX call to get full API with lon and lat values
        $.ajax({
            url: fullURL,
            method: 'GET'
        }).then(locationQuery);

    });
}

function locationQuery() {
    console.log(lat);
    console.log(lon);
}

//stored button listener -- search string will be different - but can go to the build query function

//search button listener - have a different button listener and build for dynamic stored buttons
$('#search-button').on('click', function (event) {
    event.preventDefault();
    searchString = $('#search-input').val();

    var queryURL = buildQuery();

    // $.ajax({
    //     url: queryURL,
    //     method: 'GET'
    // }).then(firstResponse);

});