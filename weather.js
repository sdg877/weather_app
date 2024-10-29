import axios from "axios";

export function getWeather(lat, lon, timezone) {
  return axios
    .get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
        current_weather: true,
        hourly:
          "temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m",
        daily:
          "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,uv_index_max,sunrise,sunset",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timeformat: "unixtime",
      },
    })
    .then(({ data }) => {
      const weatherData = Array.isArray(data) ? data[0] : data;
      return {
        current: parseCurrentWeather(weatherData),
        daily: parseDailyWeather(weatherData),
        hourly: parseHourlyWeather(weatherData),
      };
    });
}

function parseCurrentWeather({ current_weather, daily }) {
  if (!current_weather || !daily) {
    return {
      currentTemp: null,
      highTemp: null,
      lowTemp: null,
      highFeelsLike: null,
      lowFeelsLike: null,
      windSpeed: null,
      precip: null,
      iconCode: null,
      uvIndex: null,
      sunrise: null,
      sunset: null,
    };
  }

  const {
    temperature: currentTemp = null,
    windspeed: windSpeed = null,
    weathercode: iconCode = null,
  } = current_weather;

  const {
    temperature_2m_max: [maxTemp] = [null],
    temperature_2m_min: [minTemp] = [null],
    apparent_temperature_max: [maxFeelsLike] = [null],
    apparent_temperature_min: [minFeelsLike] = [null],
    precipitation_sum: [precip] = [null],
    uv_index_max: [uvIndex] = [null],
    sunrise: [sunrise] = [null],
    sunset: [sunset] = [null],
  } = daily;

  return {
    currentTemp: currentTemp !== null ? Math.round(currentTemp) : null,
    highTemp: maxTemp !== null ? Math.round(maxTemp) : null,
    lowTemp: minTemp !== null ? Math.round(minTemp) : null,
    highFeelsLike: maxFeelsLike !== null ? Math.round(maxFeelsLike) : null,
    lowFeelsLike: minFeelsLike !== null ? Math.round(minFeelsLike) : null,
    windSpeed: windSpeed !== null ? Math.round(windSpeed) : null,
    precip: precip !== null ? Math.round(precip * 100) / 100 : null,
    iconCode,
    uvIndex,
    sunrise: sunrise * 1000,
    sunset: sunset * 1000,
  };
}

function parseDailyWeather({ daily }) {
  if (!daily || !daily.time) {
    return [];
  }
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      maxFeelsLike: Math.round(daily.apparent_temperature_max[index]),
      minFeelsLike: Math.round(daily.apparent_temperature_min[index]),
      uvIndex: daily.uv_index_max[index],
      sunrise: daily.sunrise[index] * 1000,
      sunset: daily.sunset[index] * 1000,
    };
  });
}

function parseHourlyWeather({ hourly, current_weather }) {
  if (!hourly || !hourly.time) {
    return [];
  }
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(
      ({ timestamp }) =>
        current_weather && timestamp >= current_weather.time * 1000
    );
}
