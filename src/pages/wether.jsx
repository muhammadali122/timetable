// Import modules

import React, { useEffect, useState } from "react";
import clear_icon from "../assets/clear.png";
import clouds_icon from "../assets/clouds.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import mist_icon from "../assets/mist.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { getWetherData } from "../services/wether.service";
<meta name="viewport" content="width=device-width, initial-scale=1" />;
// Weather Api fetching

const Weather = () => {
  const [weatherIcon, setWeatherIcon] = useState(clouds_icon);
  const [searchSring, setSearchString] = useState("");
  const [previousSearch, SetPreviousSearch] = useState([]);
  const [weatherData, setWeatherData] = useState({
    icon: "",
    main: {},
    name: "",
    wind: { speed: 0, deg: 0 },
  });

  //Handle get data
  const handleGetWeather = () => {
    SetPreviousSearch([...previousSearch, searchSring]);
    setSearchString("");
    if (searchSring) {
      getWetherData(searchSring).then(
        (res) => {
          const { main, weather, name, wind } = res.data;
          setWeatherData({
            ...weatherData,
            main: main,
            icon: weather[0].icon,
            name: name,
            wind: wind,
          });
        },
        (error) => {
          setWeatherData({});
          alert(error);
        }
      );
    } else {
      alert("Please Enter a city name!!!");
    }
  };

  //Handle Search value
  const handleSearchValue = (value) => {
    setSearchString(value);
  };

  //Change Icons
  useEffect(() => {
    if (weatherData?.icon) {
      if (weatherData.icon === "01d" || weatherData.icon === "01n") {
        setWeatherIcon(clear_icon);
      } else if (weatherData.icon === "02d" || weatherData.icon === "02n") {
        setWeatherIcon(clouds_icon);
      } else if (weatherData.icon === "03d" || weatherData.icon === "03n") {
        setWeatherIcon(drizzle_icon);
      } else if (weatherData.icon === "04d" || weatherData.icon === "04n") {
        setWeatherIcon(drizzle_icon);
      } else if (weatherData.icon === "09d" || weatherData.icon === "09n") {
        setWeatherIcon(rain_icon);
      } else if (weatherData.icon === "10d" || weatherData.icon === "10n") {
        setWeatherIcon(rain_icon);
      } else if (weatherData.icon === "13d" || weatherData.icon === "13n") {
        setWeatherIcon(snow_icon);
      } else if (weatherData.icon === "50d" || weatherData.icon === "50n") {
        setWeatherIcon(mist_icon);
      } else {
        setWeatherIcon(clear_icon);
      }
    }
  }, [weatherData]);

  return (
    <div className="container">
      <div className="top-bar d-flex">
        <div>
          <input
            type="text"
            value={searchSring}
            className="cityInput px-2"
            placeholder="Enter city name"
            onChange={(e) => handleSearchValue(e.target.value)}
          />
          <div className="position">
            {searchSring.length > 0 &&
              previousSearch.map((val) => (
                <p
                  onClick={() => setSearchString(val)}
                  className="text-start px-2"
                >
                  {val}
                </p>
              ))}
          </div>
        </div>
        <div className="search-icon" onClick={() => handleGetWeather()}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weather-temp">
        {Math.round(weatherData.main?.temp) || 16}°C
      </div>
      <div className="weather-location">{weatherData.name}</div>

      <div className="row">
        <div className="col-6">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">
              {Math.round(weatherData.main?.humidity) || 82}%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="col-6">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              {Math.round(weatherData.wind?.speed) || 0} km/h
            </div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
