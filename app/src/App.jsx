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
  const [hours, setHours] = useState([]);

  // const [paramSearch, setparamSearch] = useState(null);

  const handleSuccess = useCallback((coordinates) => {
    // setparamSearch(coordinates);
    fSearchWeather(coordinates);
    // Aqui você faria sua "ação" principal com as coordenadas
  }, []);

  useGeolocation(handleSuccess);

  // console.log("PARAMETROS DE BUSCA", paramSearch);

  async function fSearchWeather(paramSearch) {
    console.log("Função de busca", paramSearch.latitude);
    console.log("Função de busca", paramSearch.longitude);

    console.log(`Coordenadas salvas: Lat ${paramSearch}`);

    // Busca pela localização atual
    if (paramSearch.latitude && paramSearch.longitude) {
      try {
        const responseToday = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            paramSearch.latitude
          }&lon=${paramSearch.longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=pt_br`
        );

        const responseForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            paramSearch.latitude
          }&lon=${paramSearch.longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=pt_br`
        );

        const grouped = fGroupByDate(responseForecast.data.list);

        console.log("AGRUPADO", grouped);

        setToday(responseToday.data);
        console.log("TODAY", today);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">How is the Weather?</h1>
      <ViewWeather data={today} />
    </div>
  );
}

export default App;
