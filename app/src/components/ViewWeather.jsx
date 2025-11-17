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

      <div className="card w-96 bg-base-100 card-xl shadow-sm bg-white">
        <div className="card-body text-black">
          <div class="grid grid-flow-col grid-rows-2 gap-4">
            <div class="row-span-3">TESTE 1</div>
            <div class="col-span-2">TESTE 2</div>
            <div class="col-span-2 row-span-2">TESTE 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewWeather;
