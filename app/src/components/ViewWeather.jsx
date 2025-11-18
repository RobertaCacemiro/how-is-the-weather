function ViewWeather({ data }) {
  console.log("DATA", data);

  // for (let chave in data) {
  //   console.log("Local", data[chave]);
  // }
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="card w-96 h-10 bg-base-100 card-xl shadow-sm bg-white">
        <h1 className="text-black">{data.name}</h1>
      </div>

      <div className="card w-96 card-xl shadow-sm bg-white p-0">
        {/* <div className="card-body text-black"> */}
        <div class="grid grid-flow-col grid-rows-2 gap-4">
          <div class="col-span-2 bg-red-300">{data.main?.temp}</div>
          <div class="col-span-2 bg-green-300">
            <div className="hover-3d">
              {/* content */}
              <figure className="w-60 rounded-2xl">
                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt="Tailwind CSS 3D card"
                />
              </figure>
              {/* 8 empty divs needed for the 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="hover-3d"></div>
          </div>
          <div class="row-span-3 bg-yellow-300">{data.main?.temp}</div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ViewWeather;
