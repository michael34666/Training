
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    x = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  x = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function error() {
  alert("No position available.");
}

