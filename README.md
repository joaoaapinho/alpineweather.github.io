<p align="center">
  <img src="assets/images/logo_w_background.png?raw=true" alt="Alpine Weather logo" width="30%">
</p>

<h3 align="center">Alpine Weather Web App</h3>

<p align="center"><b>Done by:</b> João André Pinho</p>

<h2>🔗🔑 Project Link </h2>

Link:
- **Alpine Weather Web App** - https://joaoaapinho.github.io/alpineweather.github.io/

<h2> 👁‍🗨 Overview </h2>

A simple and responsive web app dashboard that provides real-time weather information, air pollution data, and weather forecasts for any location.

Take a look at the demo below for a quick overview of the project's flow 🔽

![Alt Text](/assets/images/AlpineWeather_demo.gif)
**Note:** Also accessible on mobile devices.

<h2> 💻 Technology Stack </h2>

Javascript, Bootstrap, HTML and CSS.

<h2> 📋 Features </h2>

- Automatically detects user's location on page load;
- Search for weather information by city and country;
- Displays current weather conditions;
- Displays air pollution data;
- Hourly weather forecast for the current day;
- Daily weather forecast for the next 4 days with filtering;
- Sunrise and sunset times.

<h2> ⚙️ How it Works </h2>

• ** 📍 Location Detection:**
Upon opening the app, the pageOpen() function is called, which retrieves the user's current location using the navigator.geolocation API. If the user grants permission and the location is available, the showPosition() function is executed, fetching the user's city and country from the ipregistry API. The weather information for the user's current location is then displayed.

• ** 🔎 Search Functionality:**
Users can search for weather information by entering a city and country. The searchWeather() function is triggered when the user submits the form. The function fetches weather data for the specified location and updates the dashboard with the new information.

• ** ☀️ Weather Data:**
The weather data is fetched from the OpenWeatherMap API, which provides current weather conditions, air pollution data, and weather forecasts. The fetchApi() function is a general-purpose function for making API requests and handling responses. Specific API endpoints are constructed using the apiUrl object.

• ** 📽️ Displaying Data:**
The dashboard is updated with the fetched data using various functions:

  - updateViewDisplay(): Updates the current weather conditions, including temperature, description, icon, date, and location. It also updates the sunrise, sunset, humidity, pressure, and visibility when isSearch parameter is set to true.
  - updateAirPollutionDataDisplay(): Updates the air quality data.
  - updateHourlyForecaseDisplay(): Updates the hourly weather forecast for current day.
  - updateUpcomingForecase(): Updates the daily weather forecast for the next 4 days.

• ** 🌪️ Filter Functionality:**
Users can filter the displayed weather information based on the amount of days they want to see in advance. The filter function is triggered when the user selects a filter from the dropdown menu. The function filters the number of forecasted weather cards that are displayed, depending on the number of selected days.

These functions make use of the fetched data and update the corresponding HTML elements with the relevant information.

<h2> 🎯 Conclusions and Future Improvements </h2>

Overall, the Alpine Weather Web App is a promising and simple solution for users who seek to stay up-to-date on weather conditions and forecasts.

While the developed features meet the agreed project requirements, there are still some improvement opportunities that can be explored in future updates:

- **Adapt to user timezone** - As of now, the sunset and sunrise times were kept in UTC format - Universal Time Coordinated Format, which may result in some time differences depending on the users' region. In future updates, the app could implement a new feature that adapts to the user's timezone and presents these times accordingly.

- **Provide more detailed temperature forecasts** - Because of the free nature of the OpenWeather API only the upcoming temperatures for the following 4 days at midnight could be retrived, hence these can be enriched with the minimum and maximum temperature for each day.
