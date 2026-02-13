var minasUnidades = JSON.parse(localStorage.getItem("minasUnidades")) || [];

function AleatoriasUnidades(){
    document.getElementById("nuevas").innerHTML = "";
    console.log("----------------------------------")
    let unidadesAleatorias = "";
    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalPersonajes) + 1;

        unidadesAleatorias += `
            <div class="c-lista-unidad c-una_aleatoria">
                <p>${num}</p>
                <img src="${baseDatosTrench[num - 1].image}" alt="${baseDatosTrench[num - 1].name}" class="unidad-img-small">
                <p>${baseDatosTrench[num - 1].name}</p>
            </div>`;

        minasUnidades = JSON.parse(localStorage.getItem("minasUnidades")) || [];
        let existe = false;
        for(let j = 0; j < minasUnidades.length; j++){
            if(minasUnidades[j] === num){
                existe = true;
                break; 
            }
        }

        if (!existe) {
            minasUnidades.push(num);
            localStorage.setItem("minasUnidades", JSON.stringify(minasUnidades));
            document.getElementById("c-unidad-" + num).innerHTML = `
            <div onclick="Detalle('${num}')">
                <img src="${baseDatosTrench[num - 1].image}" alt="${baseDatosTrench[num - 1].name}" class="unidad-img-tiny">
                <p>${num}</p>
            </div>`
            document.getElementById("c-unidad-" + num).classList.add("c-mias-unidades")
        }
    }

    document.getElementById("nuevas").innerHTML += unidadesAleatorias
    document.getElementById("contador").innerHTML = `${minasUnidades.length} / ${totalPersonajes}`;
}





function Capturados(){
    document.getElementById("root").innerHTML = ""

    //crear aleatorios
    const capturaAleatorea = document.createElement("section");
    capturaAleatorea.classList.add("c-lista");
    capturaAleatorea.id = "nuevas"

    //crear boton d aleatorios
    const boton = document.createElement("button");
    boton.textContent = "Reclutar 4 nuevos"
    // Agregar el evento click para generar 4 nuevas unidades
    boton.addEventListener("click", () => {
        AleatoriasUnidades(); 
    });


    //crear album
    const seccionunidades = document.createElement("section");
    seccionunidades.classList.add("c-lista");

    let misUnidades = "";
    for (let i = 1; i <= totalPersonajes; i++) {
        if(minasUnidades.includes(i)){
            misUnidades += `
            <div class="c-unidad c-mias-unidades personaje-${i}" onclick="Detalle('${i}')">
                <div class="unidad-avatar-small">⚔️</div>
                <p>${i}</p>
            </div>`;
        }else{
            misUnidades += `
            <div class="c-unidad" id="c-unidad-${i}">
                <p>${i}</p>
            </div>
            `
        }
        
    }
    seccionunidades.innerHTML = misUnidades;

    //rangos y reclutados
    let contador = document.createElement("p");
    contador.textContent = `${minasUnidades.length} / ${totalPersonajes}`;
    contador.id = "contador"

    //añadir al elemento
    document.getElementById("root").appendChild(contador)
    document.getElementById("root").appendChild(boton)
    document.getElementById("root").appendChild(capturaAleatorea)
    document.getElementById("root").appendChild(seccionunidades)
}