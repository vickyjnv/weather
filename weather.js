//we need to make the temperature global so other files can access it
var currentTemp;
$(document).ready(function () {
  $('#weatherButton').on('click', function () {
    //make sure user's browser has the HTML5 geolocation capability
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var userLatitude = position.coords.latitude;
        var userLongitude = position.coords.longitude;
        console.log("Your coordinates are ", userLatitude, ",", userLongitude);
        //use Darksky API to get weather data from
        var beginningURL = "https://api.darksky.net/forecast/68e0311c2e1951df1116a5ff30a4af6f/"
        var fullURL = beginningURL + userLatitude + "," + userLongitude;
        //a sample darksky URL is https://api.darksky.net/forecast/68e0311c2e1951df1116a5ff30a4af6f/latitude,longitude

        //Next, actually need to get the data. We probably need JSONP to get the data due to CORS restrictions.
        $.ajax({
          url: fullURL,
          dataType: "jsonp",
          //we want ["currently"]["summary"] since it gives weather condition
          success: function (json) {
            currentTemp = json["currently"]["temperature"];

            document.getElementById("weatherConditions").innerHTML = "Currently, based on your geolocation, the weather condition is <strong>" + json["currently"]["summary"] + "</strong>." +
              " Click below to get your temperature in Celsius, Fahrenheit, or both";
            //the only icons defined by darksky are clear-day, clear-night, rain, snow, sleet, wind, fog,
            //cloudy, partly-cloudy-day, or partly-cloudy-night
            //so, if json["currently"]["icon"] are any of those, then create the appropiate animation

            //the following code for the weather animations is from a project called skycons which is
            //in the public domain https://github.com/darkskyapp/skycons
            //I used the weather animation code in a slightly modified way
            //since I am using Forecast API, I can, for animations, use something like
            //skycons.add("icon1", "rain"); or better yet skycons.add("icon1",json["currently"]["icon"]);
            var skycons = new Skycons();

            //choose animation based on what json["currently"]["icon"] is
            skycons.add("icon1", json["currently"]["icon"]);

            // start animation!
            skycons.play();
          }
        });
      }, function (err) {
        document.write(err.message);
      }); //end of navigator.geolocation.getCurrentPosition
    } else {
      $("#weatherConditions").text("GPS functionality doesn't work. Please use a more modern browser.");
    }
  }); //end of of $('#testButton').on('click', function() {
}); //end of $(document).ready

//function to round the temperature to the nearest tenths place
function roundTemp(T) {
  return Math.round((T * 10)) / 10;
}

//function to convert the temperature from Fahrenheit to Celcius
function convertFToC(T) {
  return (T - 32) / 1.8;
}

//function to return rounded temperature in Celcius
function getTempC(F) {
  document.getElementById("temperatureDisplay").innerHTML = "The temperature in Celsius is <strong>" + roundTemp(convertFToC(F)) + "C</strong>";
}

//function to return rounded temperature in Fahrenheit
function getTempF(F) {
  document.getElementById("temperatureDisplay").innerHTML = "The temperature in Fahrenheit is <strong>" + roundTemp(F) + "F</strong>";
}

//function to return rounded temperature in Fahrenheit and Celcius
function getBothTemps(F) {
  document.getElementById("temperatureDisplay").innerHTML = "The temperature in Fahrenheit is <strong>" + roundTemp(F) + "F</strong> and the temperature in Celcius is <strong>" + roundTemp(convertFToC(F)) + "C</strong>";
}