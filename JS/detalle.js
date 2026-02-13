var esFavorito = false;

// Función para agregar o quitar un personaje de favoritos
function toggleFavorito(paramid, paramname) {

    // Leer favoritos actuales desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false

    // Verificar si ya está guardado
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].name === paramname) {
            existe = true;
            break;
        }
    }

    if (existe == true) {
        favoritos = favoritos.filter(p => p.name !== paramname);
        esFavorito = false;
    } else {
        // Si no está, agregarlo
        favoritos.push({
            name: paramname,
            id: paramid
        });
        esFavorito = true;
    }

    // Guardar el array actualizado en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar el icono en pantalla (si existe el botón)
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

function Detalle(id) {
    const root = document.getElementById("root");
    root.innerHTML = "";

    // Buscar el personaje en la base de datos
    const personaje = baseDatosTrench.find(p => p.id == id);
    
    if (!personaje) {
        root.innerHTML = "<p>Personaje no encontrado</p>";
        return;
    }

    // Revisar si este personaje ya está en favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(p => p.name === personaje.name);

    // HTML del detalle
    const detalle = `
    <section class="c-detalle">
      <img src="${personaje.image}" alt="${personaje.name}" class="detalle-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23666%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23fff%22 font-size=%2224%22%3E⚔️%3C/text%3E%3C/svg%3E'">
      <h2>${personaje.name}</h2>
      <p><strong>ID:</strong> ${personaje.id}</p>
      <p><strong>Facción:</strong> <span class="faction-badge">${personaje.faction}</span></p>
      <p><strong>Rol:</strong> ${personaje.description}</p>
      <p class="detalle-bio">Lorem ipsum dolor sit amet. Este es un personaje importante en el universo de Trench Crusader con habilidades especializadas.</p>

      <button onClick="toggleFavorito(${personaje.id}, '${personaje.name}')">
        <span id="corazon-${personaje.id}">${esFavorito ? '❤️' : '🤍'}</span> Agregar a Favoritos
      </button>
      <button onClick="Home()">Volver</button>
    </section>
  `;

    root.innerHTML = detalle;
}