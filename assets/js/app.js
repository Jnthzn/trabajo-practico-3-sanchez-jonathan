let personajes = [];

const contenedorPersonajes = document.getElementById("contenedorPersonajes");
const mensaje = document.getElementById("mensaje");

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch("https://thesimpsonsapi.com/api/characters");

    const datos = await respuesta.json();

    personajes = datos;
    console.log(personajes);
    renderizarPersonajes(personajes);
  } catch (error) {
    console.error(error);
    mensaje.textContent = "Error al obtener todos los personajes.";
  }
}

obtenerPersonajes();

function renderizarPersonajes(personajes) {
  contenedorPersonajes.innerHTML = "";

  personajes.forEach((personaje) => {
    contenedorPersonajes.innerHTML += `
            <div class="col-3 pb-2 d-flex justify-content-center">
                <div class="card h-100">
                
                    <img 
                    src="https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}"
                    class="card-img-top"
                    alt="${personaje.name}"
                    >

                    <div class="card-body">

                        <h5 class="card-tittle">${personaje.name}</h5>
                        <p class="card-text">${personaje.ocupation}</p>
                        <p class="card-text">${personaje.status}</p>

                        <button 
                            class="btn btn-warning" 
                            data-id="${personaje.id}">
                            Ver Detalle
                        </button>

                    </div>

                </div>
            </div>
        `;
  });
}
