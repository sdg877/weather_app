# Simple Weather Application

This is a simple weather application built using HTML, CSS, and JavaScript. It fetches weather data from an API and displays the current weather conditions, a 7-day forecast, and a 24-hour forecast using the user's location. This project was built following a code-along tutorial to practice and enhance my skills. I adapted it to allow the user to search by postcode.

## Deployed Project

[https://appforlocalweather.netlify.app/](https://appforlocalweather.netlify.app/)

## Features

* Displays current weather conditions, including temperature, high/low, "feels like" high/low, wind speed, and precipitation.
* Shows a 7-day forecast with daily high temperatures and icons.
* Provides a detailed 7-day forecast with hourly temperature, "feels like" temperature, wind speed, and precipitation.
* Uses a template to efficiently generate the hourly forecast rows, demonstrating understanding of DOM manipulation.
* Allows the user to easily share their location with the app through a browser prompt, enabling dynamic retrieval of local weather data.
* **Added features:** UV index, sunrise and sunset times, and a search-by-postcode functionality.

## Technologies Used

* HTML
* CSS
* JavaScript
* Weather API: [https://open-meteo.com/](https://open-meteo.com/)
* Geocoding API: [https://opencagedata.com/](https://opencagedata.com/)

## What I Learned

* Fetching data from a weather API and parsing JSON responses.
* Working with JavaScript's Date object for date and time formatting.
* Dynamically updating the DOM with JavaScript to display weather information.
* Using templates to efficiently generate repeating HTML elements.
* Using a geocoding API to convert postcodes to coordinates.

## Future Improvements

* Improve the visual design and user experience.

## Credits

This project was inspired by the code-along tutorial by [Traversy Media](https://www.youtube.com/watch?v=w0VEOghdMpQ).
