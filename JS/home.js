function buscadorfuncion(sza){
    if(sza.length >= 3){
        const filtrados = [];
        for (let i = 0; i < personajes.length; i++) {
            const nombre = personajes[i].name.toLowerCase();
            if (nombre.includes(sza.toLowerCase())) {
                filtrados.push(personajes[i]);
            }
        }
        let listaHTML = generarLista(filtrados)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }else{
        let listaHTML = generarLista(personajes)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function generarLista(arrayPersonajes) {
    let listaHTML = "";
    for (let i = 0; i < arrayPersonajes.length; i++) {
        let id = arrayPersonajes[i].id;
        listaHTML += `
        <div class="c-lista-personaje personaje-${id}" onclick="Detalle('${id}')">
            <p>#${id}</p>
            <img src="${arrayPersonajes[i].image}" alt="${arrayPersonajes[i].name}" class="personaje-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23666%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23fff%22 font-size=%2214%22%3E⚔️%3C/text%3E%3C/svg%3E'">
            <p>${arrayPersonajes[i].name}</p>
            <span class="faction">${arrayPersonajes[i].faction}</span>
        </div>`;
    }

    return listaHTML;
}

function Home(filtro){
    var root = document.getElementById("root");
    
    // Limpiar el contenido anterior
    root.innerHTML = "";

    //buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar personaje...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    //contenedor filtro por facción
    const facciones = ["All", "Peregrinos de la Trinchera", "Legión Hereje", "Principado de Nueva Antioquía", "Sultanato del Muro de Hierro", "Culto del Grial Negro"];

    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("facciones-container"); 

    for (let i = 0; i < facciones.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = facciones[i];
        // Agregar el evento click para filtrar por facción
        btn.addEventListener("click", () => {
            if(facciones[i] === "All"){
                Home();
            } else {
                FiltroConexion(facciones[i]);
            }
        });
        // Agregar el botón al contenedor
        contenedorFiltro.appendChild(btn);
    }

    //add contenedor lista
    const listaHTML = generarLista(personajes);
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = listaHTML;

    //agregar contenedores
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);
}