**JavaScript**

**Individual Assignment**

## Alpine Weather Dashboard

A simple and responsive weather dashboard that provides real-time weather information, air pollution data, and weather forecasts for any location.

![Alt text](assets/images/logo_w_background.png?raw=true "Alpine Weather")

---/---
### Demo

![Alt Text](/assets/images/AlpineWeather_demo.gif)


### Technology Stack

Javascript, Bootstrap, HTML and CSS

### Features
- Automatically detects user's location on page load;
- Search for weather information by city and country;
- Displays current weather conditions;
- Displays air pollution data;
- Hourly weather forecast for the current day;
- Daily weather forecast for the next 4 days with filtering;
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
  - updateAirPollutionDataDisplay(): Updates the air quality data.
  - updateHourlyForecaseDisplay(): Updates the hourly weather forecast for current day.
  - updateUpcomingForecase(): Updates the daily weather forecast for the next 4 days.

• **Filter Functionality:**
Users can filter the displayed weather information based on the amount of days they want to see in advance. The filter function is triggered when the user selects a filter from the dropdown menu. The function filters the number of forecasted weather cards that are displayed, depending on the number of selected days.

These functions make use of the fetched data and update the corresponding HTML elements with the relevant information.


(Disclaimer: For the purpose of the exercise, the sunset and sunrise times were kept in UTC format - Universal Time Coordinated Format, hence some possible time differences may arise depending on the users' region. Additionally, because of the free nature of the OpenWeather API only the upcoming temperatures for the following 4 days at midnight could be retrived).
