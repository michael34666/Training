//location finder
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
  
    } 
    
    else {
      document.getElementById("weather").innerText = "Geolocation is not supported by this browser.";
    }
    
  }
  
  // Function to handle successful loc finder
   function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const API_KEY = '63bb193d80834d6483c143520250207';
  
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;
  
        fetch(url)
          .then(res => res.json())
          .then(data => {


            document.getElementById("Temperature").innerHTML = `${data.current.temp_c} °C`;
            document.getElementById("Condition").innerHTML = `${data.current.condition.text}<br>`;
            document.getElementById("Location").innerHTML = `${data.location.name}, ${data.location.country}`;
            document.getElementById("Humidity").innerHTML = `${data.current.humidity} % <br> Humidity`;
            document.getElementById("FeelsLike").innerHTML = `${data.current.feelslike_c} °C <br> Feels like `;

            
            
          })
          .catch(() => {
            document.getElementById("weather").innerText = "Could not load weather.";
          });
      }
  
      function error() {
        document.getElementById("weather").innerText = "Location not available.";
      }
  
  
  
  // Initial call to get the user's location and weather
  getLocation();
  
  // Repeat every 30 seconds
  setInterval(getLocation, 30000);