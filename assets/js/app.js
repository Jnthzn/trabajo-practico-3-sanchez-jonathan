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
        console.error(error)
        mensaje.textContent = "Error al obtener todos los personajes.";
    }
}

obtenerPersonajes();

function renderizarPersonajes(personajes) {
    contenedorPersonajes.innerHTML = "";

    personajes.forEach(personaje => {

        contenedorPersonajes.innerHTML += `
        
        `;

    });
}