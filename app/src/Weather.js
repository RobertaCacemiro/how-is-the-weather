import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Obter previsão do tempo</button>
      </form>

      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Descrição: {weatherData.weather[0].description}</p>
          <p>Sensação térmica: {weatherData.main.feels_like}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Pressão atmosférica: {weatherData.main.pressure} hPa</p>
          <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Carregando dados meteorológicos...</p>
      )}
    </div>
  );
};

export default Weather;
