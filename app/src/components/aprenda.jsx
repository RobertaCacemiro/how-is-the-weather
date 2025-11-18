import { useCallback, useState, useEffect } from "react";

function ViewWeather({ prevision }) {
  if (!prevision || Object.keys(prevision).length === 0) return null;

  const dates = Object.keys(prevision);

  // Estado da data selecionada
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  // Estado do horário selecionado (índice dentro do array daquele dia)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Lista para o dia selecionado
  const dayList = prevision[selectedDate];

  // Item do card principal (agora OU horário selecionado)
  const mainItem = dayList[selectedIndex];

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="flex gap-3 overflow-x-auto mb-4 px-2 w-full">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => {
              setSelectedDate(date);
              setSelectedIndex(0); // resetar para o primeiro item do dia
            }}
            className={`px-4 py-2 rounded-lg border shadow-sm min-w-[120px]
              ${
                selectedDate === date
                  ? "bg-blue-500 text-white border-blue-700"
                  : "bg-white text-black"
              }`}
          >
            {new Date(date).toLocaleDateString("pt-BR")}
          </button>
        ))}
      </div>

      {/* ------------------------------------ */}
      {/* CARD PRINCIPAL — SUA ESTÉTICA ORIGINAL */}
      {/* ------------------------------------ */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="card w-96 h-10 bg-base-100 card-xl shadow-sm bg-white flex items-center px-3">
          <h1 className="text-black text-lg font-semibold">
            {mainItem.weather?.[0]?.description.toUpperCase()}
          </h1>
        </div>

        <div className="card w-96 card-xl shadow-sm bg-white p-0">
          <div className="grid grid-flow-col grid-rows-2 gap-4">
            {/* Temperatura principal */}
            <div className="col-span-1 bg-red-300 text-xl p-2">
              <div>{mainItem.main?.temp}°C</div>

              {mainItem.weather?.map((w, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="capitalize">{w.description}</span>
                </div>
              ))}
            </div>

            {/* Min/Max */}
            <div className="col-span-2 bg-green-300 p-2">
              {mainItem.main?.temp_min} / {mainItem.main?.temp_max}— Sensação{" "}
              {mainItem.main?.feels_like}°
            </div>

            {/* Ícone */}
            <div className="row-span-1 bg-yellow-300 flex justify-center items-center">
              <img
                src={`https://openweathermap.org/img/wn/${mainItem.weather?.[0]?.icon}@2x.png`}
                className="animate-wiggle"
                alt="weather icon"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------- */}
      {/* CARROSSEL DE HORÁRIOS (embaixo) */}
      {/* --------------------------- */}
      <h2 className="text-xl font-semibold mb-3">Horários</h2>

      <div className="flex gap-3 overflow-x-auto w-full px-4">
        {dayList.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`card shadow-md p-3 min-w-[120px] border
              ${
                selectedIndex === index
                  ? "bg-blue-500 text-white border-blue-700"
                  : "bg-white"
              }`}
          >
            <p className="font-bold text-center">
              {item.dt_current
                ? "Agora"
                : new Date(item.dt * 1000).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              className="mx-auto"
            />

            <p className="text-center text-lg font-semibold">
              {Math.round(item.main.temp)}°C
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewWeather;
