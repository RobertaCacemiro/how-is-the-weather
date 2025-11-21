import { useEffect, useState } from "react";

function ViewWeather({ prevision }) {
  const dates = Object.keys(prevision);

  // Estado das horas selecionadas por data
  const [currentHourIndex, setCurrentHourIndex] = useState({});

  // Descobrir a data e hora onde dt_current = true
  useEffect(() => {
    let initialDateIndex = 0;
    let hourIndex = 0;

    dates.forEach((date, dIndex) => {
      prevision[date].forEach((h, hIndex) => {
        if (h.dt_current === true) {
          initialDateIndex = dIndex;
          hourIndex = hIndex;
        }
      });
    });

    // seta a hora ativa da data
    const dateKey = dates[initialDateIndex];

    setCurrentHourIndex((prev) => ({
      ...prev,
      [dateKey]: hourIndex,
    }));

    // muda o carrossel para o slide correto
    window.location.hash = `#slide${initialDateIndex}`;
  }, []);

  return (
    <div className="carousel w-full">
      {dates.map((date, idx) => {
        const hours = prevision[date];

        const activeHourIndex = currentHourIndex[date] ?? 0;

        return (
          <div
            key={idx}
            id={`slide${idx}`}
            className="carousel-item flex flex-col items-center w-full p-4"
          >
            {/* NAV DO CARROSSEL (datas) */}
            <div className="flex items-center justify-between w-full max-w-md mb-4">
              <a
                href={`#slide${idx === 0 ? dates.length - 1 : idx - 1}`}
                className="btn btn-circle"
              >
                ❮
              </a>

              <span className="text-lg font-bold">{date}</span>

              <a
                href={`#slide${idx === dates.length - 1 ? 0 : idx + 1}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>

            {/* CARD – muda conforme a hora */}
            <div className="card bg-base-200 shadow-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-semibold mb-2">
                Hora: {hours[activeHourIndex].hour}
              </h2>

              <pre className="text-sm">
                {JSON.stringify(hours[activeHourIndex], null, 2)}
              </pre>
            </div>

            {/* PAGINAÇÃO DAS HORAS */}
            <div className="join mt-4">
              {hours.map((_, hIdx) => (
                <button
                  key={hIdx}
                  className={`join-item btn ${
                    activeHourIndex === hIdx ? "btn-active" : ""
                  }`}
                  onClick={() =>
                    setCurrentHourIndex((prev) => ({
                      ...prev,
                      [date]: hIdx,
                    }))
                  }
                >
                  {hIdx + 1}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewWeather;
