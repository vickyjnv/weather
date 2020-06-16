//This file contains event listeners for the buttons

var cTempListener = document.getElementById("cTempButton");
cTempListener.addEventListener("click", function() {
  getTempC(currentTemp);
  //document.getElementById("testingDiv").innerHTML = "Some text";
});

var fTempListener = document.getElementById("fTempButton");
fTempListener.addEventListener("click", function() {
  //console.log("Getting F temp")
  getTempF(currentTemp);
});

var bothTempsListener = document.getElementById("bothTempsButton");
bothTempsListener.addEventListener("click", function() {
  //console.log("Getting both temps")
  getBothTemps(currentTemp);
});
