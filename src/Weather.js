
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('Toronto'); // Default city
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = '7f869a93d52ecad39d052b7cd4b58a3d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        // Convert temperature from Kelvins to Celsius
        const temperatureCelsius = response.data.main.temp - 273.15;

        // Update weatherData with the converted temperature
        setWeatherData({
          ...response.data,
          main: {
            ...response.data.main,
            temp: temperatureCelsius
          }
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]); // Trigger effect when city changes

  const handleSearch = (e) => {
    e.preventDefault();
    // Get input value from the search form
    const newCity = e.target.elements.city.value;
    setCity(newCity);
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>

      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>

      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>Temperature: {weatherData.main.temp.toFixed(2)} °C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
