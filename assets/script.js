$(document).ready(function () {

    var todaysDate = moment().format('DD/MM/YYYY');
    // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.
    var geoURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    // http://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
    var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?';
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
        geoCode = geoURL + searchString + '&appid=' + key;
        

        // To use geocode API to get lon and lat from city search -parse the results to the next ajax query
        $.ajax({
            url: geoCode,
            method: 'GET'
            // maybe move this to a function outside the call as it is turning into a soup
        }).then(function (startResponse) {

            lat = startResponse.coord.lat;
            lon = startResponse.coord.lon;
            console.log('this is the lat ' + lat + ' this is the lon ' + lon);
            queryURL = apiURL + 'lat=' + lat + '&lon=' + lon + '&appid=' + key;

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (fullResponse) {

                // pass response of list objects to new variable to shorten code later
                var results = fullResponse.list[0];
                // converting Kelvin temp to celcius, with 2 decimal points
                var temp = (results.main.temp - 273.15).toFixed(2);
                var wind = results.wind.speed;
                var humid = results.main.humidity;
                // grab icon data then pass it through a variable- as comes in parts!
                var icon = results.weather[0].icon;
                var iconURL = 'https://openweathermap.org/img/wn/' + icon + '.png';

                
                var weatherToday = $('<div>');
                weatherToday.addClass('col-12 border p-4');

                var cityToday = $('<h2 class="text-capitalize">');
                cityToday.text(searchString + ' (' + todaysDate + ') ');

                var displayIcon = $('<img>');
                displayIcon.attr('src', iconURL);
                displayIcon.attr('title', results.weather[0].description);

                var listWeather = $('<ul class="list-unstyled">');
                var listTemp = $('<li class="pb-2">').text('Temp: ' + temp + ' ℃');
                var listWind = $('<li class="pb-2">').text('Wind: ' + wind + ' KPH');
                var listHumid = $('<li class="pb-2">').text('Humidity: ' + humid + ' %');

                weatherToday.append(cityToday);
                cityToday.append(displayIcon);
                weatherToday.append(listWeather);
                listWeather.append(listTemp, listWind, listHumid);

                //append items
                $('#today').append(weatherToday);

                //for loop to go through the other 5 day forecast
                for (var i = 0; i < 5; i++) {
                    var forecast = results[i];
                    
                }
            });

            console.log(geoCode);
    console.log(queryURL);

        });


    });

    

    // List the previous searched cities - using local storage


});
