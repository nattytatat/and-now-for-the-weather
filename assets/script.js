$(document).ready(function () {

    var todaysDate = moment().format('DD/MM/YYYY');
    var geoURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?';
    var key = 'd061286c4d7491a48e28c06cc0a8a6b6';
    var lon;
    var lat;
    var searchString = '';
    var queryURL;


    var savedCities = localStorage.getItem("savedCities");
    // var savedCities = localStorage.getItem("savedCities") || [];

   
    for (var i = 0; i < savedCities.length; i++) {
        var newBtn = $('<button>').text(savedCities[i]).addClass(savedCities[i]).text(savedCities[i]);
        console.log(savedCities[i]);
        $('#history').append(newBtn);
    }
   

    // add event listener for the search button
    $('#search-button').on('click', function () {
        event.preventDefault();
        $('#today').empty();
        $('#forecast').empty();
        $('#forecast-heading').remove();
        var fiveDayHeading = $('<h4 id="forecast-heading" class="my-4">').text('Five Day Forecast:');
        searchString = $('#search-input').val();
        geoCode = geoURL + searchString + '&appid=' + key;

        // save city search to an array
        localStorage.setItem('savedCities', searchString);
        
        // Reuse the geocode to get the saved Cities data
        // geoCode = geoURL + savedCities + '&appid=' + key;

        // To use geocode API to get lon and lat from city search -parse the results to the next ajax query
        $.ajax({
            url: geoCode,
            method: 'GET'
            // maybe move this to a function outside the call as it is turning into a soup
        }).then(function (startResponse) {

            lat = startResponse.coord.lat;
            lon = startResponse.coord.lon;
            queryURL = apiURL + 'lat=' + lat + '&lon=' + lon + '&appid=' + key;

            $.ajax({
                url: queryURL,
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




        });


    });






});
