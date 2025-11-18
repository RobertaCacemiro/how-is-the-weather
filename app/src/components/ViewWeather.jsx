function ViewWeather({ today }) {
  console.log("DATA", today);

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="card w-96 h-10 bg-base-100 card-xl shadow-sm bg-white">
        <h1 className="text-black">{today.name}</h1>
      </div>

      <div className="card w-96 card-xl shadow-sm bg-white p-0">
        {/* <div className="card-body text-black"> */}
        <div class="grid grid-flow-col grid-rows-2 gap-4">
          <div class="col-span-1 bg-red-300 text-xl">
            <div>{today.main?.temp}</div>
            <div>
              {today.weather?.map((w, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{w.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-green-300">
            {today.main?.temp_min}/{today.main?.temp_max} Sensação térmica de{" "}
            {today.main?.feels_like}
          </div>
          <div className="row-span-1 bg-yellow-300">
            <img
              src={`https://openweathermap.org/img/wn/${
                today.weather?.[today.weather.length - 1]?.icon
              }@2x.png`}
              className="animate-wiggle"
              alt="weather icon"
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ViewWeather;
