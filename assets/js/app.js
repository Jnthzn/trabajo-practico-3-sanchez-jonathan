let personajes = [];

const contenedorPersonajes = document.getElementById("contenedorPersonajes");
const mensaje = document.getElementById("mensaje");

const formBuscador = document.getElementById("formBuscador");
const buscador = document.getElementById("buscador");

const contenidoModal = document.getElementById("contenidoModal");

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch("https://thesimpsonsapi.com/api/characters");

    if (!respuesta.ok) {
      throw new Error("Error en la API");
    }

    const datos = await respuesta.json();

    personajes = datos.results;

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

                        <h5 class="card-title">${personaje.name}</h5>
                        <p class="card-text">${personaje.occupation}</p>
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

function limpiarResultados() {
  contenedorPersonajes.innerHTML = "";
}

formBuscador.addEventListener("submit", filtrarPersonajes);

function filtrarPersonajes(event) {
  event.preventDefault();

  const textoBusqueda = buscador.value.trim();

  if (textoBusqueda === "") {
    mensaje.textContent = "Ingrese un nombre para buscar";
    renderizarPersonajes(personajes);
    return;
  }

  const resultados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(textoBusqueda.toLowerCase()),
  );

  if (resultados.length === 0) {
    mensaje.textContent = "No se encontraron personajes";
    limpiarResultados();
  } else {
    mensaje.textContent = "";
    renderizarPersonajes(resultados);
  }
}

contenedorPersonajes.addEventListener("click", (event) => {
  const boton = event.target;

  if (boton.hasAttribute("data-id")) {
    const id = boton.dataset.id;

    obtenerDetallePersonaje(id);
  }
});

function mostrarModal(datos) {
  contenidoModal.innerHTML = `
  <div class="row">
    
    <div class="col-4 text-center">
      <img
      src="https://cdn.thesimpsonsapi.com/500${datos.portrait_path}"
      alt="${datos.name}"
      class="img-fluid rounded"
      >
    </div>

    <div class="col-8">
      <h2>${datos.name}</h2>

      <p><strong>Edad:</strong> ${datos.age}</p>

      <p><strong>Fecha de nacimiento:</strong> ${datos.birthdate}</p>

      <p><strong>Género:</strong> ${datos.gender}</p>

      <p><strong>Ocupación:</strong> ${datos.occupation}</p>

      <p><strong>Estado:</strong> ${datos.status}</p>

      <hr>

      <h5>Frase característica</h5>

      <blockquote class="blockquote">
        <p>
          "${
            datos.phrases.length > 0 ? datos.phrases[0] : "Sin frase disponible"
          }"
        </p>
      </blockquote>

    </div>

  </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("modalDetalle"));

  modal.show();
}

async function obtenerDetallePersonaje(id) {
  try {
    const respuesta = await fetch(
      `https://thesimpsonsapi.com/api/characters/${id}`,
    );

    if (!respuesta.ok) {
      throw new Error("Error en la API");
    }

    const datos = await respuesta.json();

    mostrarModal(datos);
  } catch (error) {
    console.error(error);
  }
}
