let pokemones = []; //lista de pokemones que llama
let totalPokes = 1025; //lista de pokemones que trae

// Conexión para obtener la lista de Pokémon
async function conexionLista(filtrotipo) { //debe esperar a que se ejeccute

 if(filtrotipo == "All"){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
    const data = await res.json();
    return data.results;
  }else{
    const res = await fetch(`https://pokeapi.co/api/v2/type/${filtrotipo}`);
    const data = await res.json();

    const pokemonesTipo = [];
    for (let i = 0; i < data.pokemon.length; i++) {
      pokemonesTipo.push(data.pokemon[i].pokemon);
    }
    return pokemonesTipo;
  } 
}



// Cargar todos los Pokémon al iniciar
async function General() {
  if (pokemones.length === 0) {
    pokemones = await conexionLista("All");
  }
  Home();
  
}
General();

async function FiltroConexion(filtroelegido){
  const pokesFiltrados = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = "";
  const listaFiltro = generarLista(pokesFiltrados);
  document.getElementById("la-lista").innerHTML = listaFiltro;
}