var todaysDate = moment().format('DD/MM/YYYY');
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
var mainURL = 'https://api.openweathermap.org/data/2.5/forecast?';
var key = '&appid=d061286c4d7491a48e28c06cc0a8a6b6';
var fiveDayHeading = $('<h4 id="forecast-heading" class="my-4">').text('Five Day Forecast:');
var cityBtns = $('#history');
var clearBtn = $('<button id="clear-buttons" class="btn btn-warning py-2 mt-4">').text('Clear Saved Cities');
var previousSearch = '';

var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

function buttonAdd() {
    // clear previous buttons as I am just adding!! OMG!
    cityBtns.empty();
    // Use a for loop to create a button for each saved city
    for (var i = 0; i < savedCities.length; i++) {
        var theCity = savedCities[i];
        var newBtn = $("<button class='btn-light btn-lg btn-block border-0 text-capitalize mb-2 py-2'>" + theCity + "</button>");
        $(newBtn).on('click', function (event) {
            event.preventDefault();
            // change the searchstring to the saved text, then pass through the geoquery again
            searchString = $(this).text();
            $('#today').empty();
            $('#forecast').empty();
            $('#forecast-heading').remove();
            geoQuery();
        });

        cityBtns.append(newBtn);
        cityBtns.append(clearBtn);

        // clear all savedButtons
        $(clearBtn).on('click', function () {
            savedCities = [];
            localStorage.clear();
            $('#history').empty();
            $('#today').empty();
            $('#forecast').empty();
            $('#forecast-heading').remove();
        });
    }
}


// add geolocation query in this function so it can be called for current and previous searches
function geoQuery() {
    queryURL = apiURL + 'q=' + searchString + key;

    // first AJAX call to parse the data from lat and lon values
    $.ajax({
        url: queryURL,
        method: 'GET',

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

        }).then(function (fullResponse) {
            var results = fullResponse.list[0];
            // converting Kelvin temp to celcius, with 2 decimal points
            var currentTemp = (results.main.temp - 273.15).toFixed(2);
            // grab icon data then pass it through a variable- as comes in parts!
            var currentIcon = results.weather[0].icon;
            var iconURL = 'https://openweathermap.org/img/wn/' + currentIcon + '.png';

            var weatherToday = $('<div>');
            weatherToday.addClass('col-12 border p-4');

            var cityToday = $('<h2 class="text-capitalize">');
            cityToday.text(searchString + ' (' + todaysDate + ') ');

            var displayIcon = $('<img>').attr('src', iconURL).attr('title', results.weather[0].description);

            var listWeather = $('<ul class="list-unstyled">');
            var listTemp = $('<li class="pb-2">').text('Temp: ' + currentTemp + ' ℃');
            var listWind = $('<li class="pb-2">').text('Wind: ' + results.wind.speed + ' KPH');
            var listHumid = $('<li class="pb-2">').text('Humidity: ' + results.main.humidity + ' %');

            //append items
            weatherToday.append(cityToday);
            cityToday.append(displayIcon);
            weatherToday.append(listWeather);
            listWeather.append(listTemp, listWind, listHumid);

            $('#today').append(weatherToday);
            $('#forecast').before(fiveDayHeading);

            // for loop that iterates through the next five days - checks when the time matches noon and prints iterations only from that time
            for (var i = 0; i < fullResponse.list.length; i++) {
                if (fullResponse.list[i].dt_txt.endsWith('12:00:00')) {
                    var nextDay = $('<div class="forecast-block m-1">');
                    // using the moment unix method we can convert and format the dt 'seconds' to the date - the dt is represented as seconds from 1st jan 1970.
                    var nextDayDate = $('<h5 class="pb-2">').text(moment.unix(fullResponse.list[i].dt).format('DD/MM/YYYY'));
                    var nextDayTemp = fullResponse.list[i].main.temp;
                    var nextDayTempConvert = $('<p class="pb-2">').text('Temp: ' + (nextDayTemp - 273.15).toFixed(2) + ' ℃');
                    var nextDayWind = $('<p class="pb-2">').text('Wind: ' + fullResponse.list[i].wind.speed + ' KPH');
                    var nextDayHumid = $('<p class="pb-2">').text('Humidity: ' + fullResponse.list[i].main.humidity + ' %');

                    var nextDayIcon = fullResponse.list[i].weather[0].icon;
                    var nextDayIconURL = 'https://openweathermap.org/img/wn/' + nextDayIcon + '.png';

                    var nextDayIconDisplay = $('<img class="pb-2">').attr('src', nextDayIconURL).attr('title', fullResponse.list[i].weather[0].description);

                    //append items
                    $('#forecast').append(nextDay);

                    nextDay.append(nextDayDate, nextDayIconDisplay, nextDayTempConvert, nextDayWind, nextDayHumid);
                }
            }

            $('#search-input').val('');
        });

    }, function (error) {
        alert('Please enter a valid location');
        return;
    });
}


//search button listener - have a different button listener and build for dynamic stored buttons
$('#search-button').on('click', function (event) {
    event.preventDefault();
    // some conditionals to check if empty values are input or if the search value already exists
    if (searchString = '') {
        alert('Please enter a valid location');
        return;
    } else {
        searchString = $('#search-input').val().trim();
    }   
     // push search string to saved cities variable
     if (savedCities.includes(searchString)) {
        return alert('you have already searched this location');
    } else {
        savedCities.push(searchString);
    }


    var queryURL = geoQuery();

   
    buttonAdd();

    // save city search to an array
    localStorage.setItem('savedCities', JSON.stringify(savedCities));

    $('#today').empty();
    $('#forecast').empty();
    $('#forecast-heading').remove();

});

// ensure all buttons remain on page upon page reload
buttonAdd();

