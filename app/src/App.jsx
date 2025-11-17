import { useCallback, useState, useEffect } from "react";
import { useGeolocation } from "./custom-hook/useGeolocation";
import axios from "axios";

import ViewWeather from "./components/ViewWeather";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
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
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            paramSearch.latitude
          }&lon=${paramSearch.longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=pt_br`
        );

        console.log("Busca Feita");
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">How is the Weather?</h1>
      <ViewWeather data={data} />
    </div>
  );
}

export default App;
