import { useCallback, useState, useEffect } from "react";
import { useGeolocation } from "./custom-hook/useGeolocation";
import { fGroupByDate } from "./functions.js";
import axios from "axios";

import ViewWeather from "./components/ViewWeather";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [today, setToday] = useState([]);
  const [prevision, setPrevision] = useState([]);
  const [hours, setHours] = useState([]);

  // const [paramSearch, setparamSearch] = useState(null);

  const handleSuccess = useCallback((coordinates) => {
    console.log("Deu certo a chamada de geolocalização");
    fSearchWeather(`lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
    // Aqui você faria sua "ação" principal com as coordenadas
  }, []);

  useGeolocation(handleSuccess);

  async function fSearchWeather(paramSearch) {
    // Busca pela localização atual
    // if (paramSearch.latitude && paraamSearch.longitude) {
    try {
      const responseToday = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?${paramSearch}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }&lang=pt_br`
      );

      // setToday(responseToday.data);

      // console.log("Resposta de hoje", responseToday.data);

      if (responseToday.data) {
        const responsePrevision = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?${paramSearch}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=pt_br`
        );

        const grouped = fGroupByDate(responsePrevision.data.list);

        const today = {
          dt: responseToday.data.dt,
          main: responseToday.data.main,
          weather: responseToday.data.weather,
          wind: responseToday.data.wind,
          clouds: responseToday.data.clouds,
          visibility: responseToday.data.visibility,
          dt_txt: new Date(responseToday.data.dt * 1000)
            .toISOString()
            .slice(0, 10),
          dt_current: true,
        };

        const currentDate = today.dt_txt.split(" ")[0]; // YYYY-MM-DD

        if (!grouped[currentDate]) grouped[currentDate] = [];

        // adiciona o clima atual ANTES da lista do forecast
        grouped[currentDate].unshift(today);

        setPrevision(grouped);
      }
    } catch (error) {
      console.error(error);
    }
    // }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">How is the Weather?</h1>
      <ViewWeather prevision={prevision} />
    </div>
  );
}

export default App;
