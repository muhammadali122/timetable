// Import modules

import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import mist_icon from "../assets/mist.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import clear_icon from "../assets/clear.png";
import clouds_icon from "../assets/clouds.png";
import search_icon from "../assets/search.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import SearchField from "../components/searchField";
import { getWetherData } from "../services/wether.service";
<meta name="viewport" content="width=device-width, initial-scale=1" />;
// Weather Api fetching

const Weather = () => {
  const [index, setIndex] = useState(0);
  const [searchSring, setSearchString] = useState("");
  const [weatherData, setWeatherData] = useState([
    {
      icon: "",
      main: {},
      name: "",
      wind: { speed: 0, deg: 0 },
    },
  ]);
  const [currentWeatherData, setCurrentWeatherData] = useState({
    icon: "",
    main: {},
    name: "",
    wind: { speed: 0, deg: 0 },
  });

  const handleSelect = (selectedIndex) => {
    console.log(
      "🚀 ~ file: wether.jsx:33 ~ handleSelect ~ selectedIndex:",
      selectedIndex
    );
    setIndex(selectedIndex);
    setCurrentWeatherData(weatherData[selectedIndex]);
  };

  //Handle get data
  const handleGetWeather = () => {
    if (searchSring) {
      getWetherData(searchSring).then(
        (res) => {
          const { main, weather, name, wind } = res.data;
          setWeatherData([
            ...weatherData,
            {
              main: main,
              icon: weather[0].icon,
              name: name,
              wind: wind,
            },
          ]);
          setSearchString("");
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

  const renderWetherIcon = (obj) => {
    if (obj?.icon) {
      if (obj.icon === "01d" || obj.icon === "01n") {
        return clear_icon;
      } else if (obj.icon === "02d" || obj.icon === "02n") {
        return clouds_icon;
      } else if (obj.icon === "03d" || obj.icon === "03n") {
        return drizzle_icon;
      } else if (obj.icon === "04d" || obj.icon === "04n") {
        return drizzle_icon;
      } else if (obj.icon === "09d" || obj.icon === "09n") {
        return rain_icon;
      } else if (obj.icon === "10d" || obj.icon === "10n") {
        return rain_icon;
      } else if (obj.icon === "13d" || obj.icon === "13n") {
        return snow_icon;
      } else if (obj.icon === "50d" || obj.icon === "50n") {
        return mist_icon;
      } else {
        return clear_icon;
      }
    }
  };

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
            weatherData.map((val) => (
              <p
                onClick={() => setSearchString(val.name)}
                className="text-start px-2"
              >
                {val.name}
              </p>
            ))}
        </div>
      </div>
      <div className="search-icon" onClick={() => handleGetWeather()}>
        <img src={search_icon} alt="" />
      </div>
    </div>

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className="weather-image">
            <img src={renderWetherIcon(currentWeatherData)} alt="" />
          </div>
          <div className="weather-temp">
            {Math.round(currentWeatherData.main?.temp) || 16}°C
          </div>
          <div className="weather-location">{currentWeatherData.name}</div>

          <div className="row">
            <div className="col-6">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percentage">
                  {Math.round(currentWeatherData.main?.humidity) || 82}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="col-6">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">
                  {Math.round(currentWeatherData.wind?.speed) || 0} km/h
                </div>
                <div className="text">wind speed</div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Weather;
