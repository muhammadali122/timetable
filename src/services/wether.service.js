import axios from "axios";
const ApiKey = "bd6e8aa26a2ea1ea3db849b3e7d7e548";

export const getWetherData = (search) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${ApiKey}`
  );
};
