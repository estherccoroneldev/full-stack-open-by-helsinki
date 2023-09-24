import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const FACTOR_CONVERTER = 273.15;

const CountryDetail = ({
  name,
  capital,
  area,
  languages,
  flagUrl,
  population,
}) => {
  const [weather, setWeather] = useState([]);
  const [main, setMain] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    axios
      .get(`${WEATHER_API_URL}${capital[0]}&appid=${API_KEY}`)
      .then((response) => {
        setWeather(response.data.weather);
        setMain(response.data.main);
        setWind(response.data.wind);
      });
  }, [capital]);

  useEffect(() => {
    if (weather?.length !== 0) {
      setIcon(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
    }
  }, [weather]);

  const tempetureCelsius = Number((main?.temp || 0) - FACTOR_CONVERTER).toFixed(
    2
  );

  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <p>Population: {population}</p>
      <div>
        <h4>Languages:</h4>
        <ul>
          {Object.values({ ...languages })?.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={flagUrl} />

      <h4>Weather in {capital}</h4>
      <p>Tempeture: {tempetureCelsius || ""} Celsius</p>
      <img src={icon || ""} />

      <p>Wind: {wind?.speed || ""} m/s</p>
    </>
  );
};

export default CountryDetail;
