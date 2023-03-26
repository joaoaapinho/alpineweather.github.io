**JavaScript**

**Individual Assignment**

## Alpine Weather Dashboard

A simple and responsive weather dashboard that provides real-time weather information, air pollution data, and weather forecasts for any location.

![Alt text](assets/images/logo_w_background.png?raw=true "Alpine Weather")

---/---

### Features
- Automatically detects user's location on page load;
- Search for weather information by city and country;
- Displays current weather conditions;
- Displays air pollution data;
- Hourly weather forecast for the next 48 hours;
- Daily weather forecast for the next 7 days;
- Sunrise and sunset times.

### How it Works

• **Location Detection:**
Upon opening the app, the pageOpen() function is called, which retrieves the user's current location using the navigator.geolocation API. If the user grants permission and the location is available, the showPosition() function is executed, fetching the user's city and country from the ipregistry API. The weather information for the user's current location is then displayed.

• **Search Functionality:**
Users can search for weather information by entering a city and country. The searchWeather() function is triggered when the user submits the form. The function fetches weather data for the specified location and updates the dashboard with the new information.

• **Weather Data:**
The weather data is fetched from the OpenWeatherMap API, which provides current weather conditions, air pollution data, and weather forecasts. The fetchApi() function is a general-purpose function for making API requests and handling responses. Specific API endpoints are constructed using the apiUrl object.

• **Displaying Data:**
The dashboard is updated with the fetched data using various functions:

  - updateViewDisplay(): Updates the current weather conditions, including temperature, description, icon, date, and location. It also updates the sunrise, sunset, humidity, pressure, and visibility when isSearch parameter is set to true.
  - updateAirPollutionDataDisplay(): Updates the air pollution data.
  - updateHourlyForecaseDisplay(): Updates the hourly weather forecast for the next 48 hours.
  - updateUpcomingForecase(): Updates the daily weather forecast for the next 7 days.

These functions make use of the fetched data and update the corresponding HTML elements with the relevant information.


(Disclaimer: For the purpose of the exercise the sunset and sunrise times were kept in UTC format - Universal Time Coordinated Format, hence some possible time differences may arise depending on the users' region).
