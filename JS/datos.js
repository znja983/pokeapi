let personajes = []; // Lista de personajes de Trench Crusade
let totalPersonajes = 12; // Total de personajes/unidades

// Base de datos de Trench Crusade - Grimdark Horror Religioso
const baseDatosTrench = [
  {
    id: 1,
    name: "Sacerdote Flagelante",
    faction: "Peregrinos de la Trinchera",
    description: "Un clérigo que ha renunciado al consuelo y adopta el dolor como oración. Sus rituales de autoflagelación purifican a los suyos y aterran a los enemigos; en combate emplea reliquias sangrientas y cánticos que fortalecen a aliados y debilitan a los corruptos.",
    image: "images/sacerdote.jpg"
  },
  {
    id: 2,
    name: "Caballero Templario",
    faction: "Peregrinos de la Trinchera",
    description: "Veterano blindado que mezcla la disciplina monástica con el rigor marcial. Porta un estandarte profusamente marcado por oraciones y heridas antiguas; su presencia inspira defensa y castiga con espadas benditas contra lo impuro.",
    image: "images/templario.jpg"
  },
  {
    id: 3,
    name: "Demonio Menor",
    faction: "Legión Hereje",
    description: "Criatura nacida de la putrefacción de las trincheras: pequeños, rápidos y voraces. No razonan como los humanos; corrompen el suelo y desatan miasmas que consumen moral y carne.",
    image: "images/demonio.jpg"
  },
  {
    id: 4,
    name: "Príncipe Infernal",
    faction: "Legión Hereje",
    description: "Señor abismal coronado en fuego y sangre. Los relatos hablan de pactos impíos y juramentos rotos; su llegada en el campo de batalla cambia la gravedad de la crueldad y ejerce dominio sobre los demonios menores.",
    image: "images/principe.jpg"
  },
  {
    id: 5,
    name: "Inquisidor Cazador",
    faction: "Peregrinos de la Trinchera",
    description: "Rastreador de herejías y posesiones, combinando tortura ritual con técnicas de caza. Sus ojos ven señales de corrupción; no muestra piedad, solo juicio, y su arma favorita es una cadena revestida de hierro bendito.",
    image: "images/inquisidor.jpg"
  },
  {
    id: 6,
    name: "Cruzado de Trinchera",
    faction: "Peregrinos de la Trinchera",
    description: "Soldado endurecido por años de guerra, relleno de cicatrices y promesas. Lucha con carácter fanático, utiliza explosivos improvisados y trincheras como fortalezas sagradas para frenar oleadas de corrupción.",
    image: "images/cruzado.jpg"
  },
  {
    id: 7,
    name: "Bruja Hereje",
    faction: "Culto del Grial Negro",
    description: "Tejedora de pactos oscuros que arraigan en rituales profanos. Su magia corrompe bendiciones, transforma aliados en sombras y convoca visiones que enloquecen a los que las contemplan.",
    image: "images/bruja.jpg"
  },
  {
    id: 8,
    name: "Bestia Infernal",
    faction: "Legión Hereje",
    description: "Abominación creada de carne soldada y huesos rotos. Incapaz de compasión, destroza formaciones y devora moral; su presencia causa que el terreno mismo rechace a los vivos.",
    image: "images/bestia.jpg"
  },
  {
    id: 9,
    name: "Técnico Antioquiano",
    faction: "Principado de Nueva Antioquía",
    description: "Ingeniero que mezcla vapor, magia y artefactos herejes. Sus dispositivos vomitan chispas y ruido, construyen trampas y le dan a sus aliados ventajas mecánicas donde la fe sola no basta.",
    image: "images/tecnico.jpg"
  },
  {
    id: 10,
    name: "Asesino Maldito",
    faction: "Sultanato del Muro de Hierro",
    description: "Asesino que vendió su alma por precisión letal. Sus cuchillas envenenan no solo la sangre, sino la voluntad, haciendo que incluso la memoria del caído se corrompa.",
    image: "images/asesino.jpg"
  },
  {
    id: 11,
    name: "Hereje Poseído",
    faction: "Legión Hereje",
    description: "Un humano que ya no es. Entre convulsiones y susurros, actúa conforme a un espíritu antiguo; sus movimientos son erráticos y peligrosamente impredecibles.",
    image: "images/poseido.jpg"
  },
  {
    id: 12,
    name: "El Profeta Caído",
    faction: "Culto del Grial Negro",
    description: "Visionario que proclamó el fin como verdad y aprendió a saciarse de él. Sus palabras son armas y sus seguidores construyen altares de desesperación alrededor de sus prédicas.",
    image: "images/profeta.jpg"
  }
];

// Conexión para obtener lista de personajes
async function conexionLista(filtrofaccion) {
  if(filtrofaccion == "All"){
    return baseDatosTrench;
  } else {
    return baseDatosTrench.filter(p => p.faction === filtrofaccion);
  }
}

// Cargar todos los personajes al iniciar
async function General() {
  if (personajes.length === 0) {
    personajes = await conexionLista("All");
  }
  Home();
}
General();

async function FiltroConexion(filtroelegido){
  const personajesFiltrados = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = "";
  const listaFiltro = generarLista(personajesFiltrados);
  document.getElementById("la-lista").innerHTML = listaFiltro;
}