// URL base de tu API (ajustala según tu backend)
const API_URL = "http://localhost:3000/api/autos";

const categorias = ["hatchback", "utilitario", "deportivo"];

async function cargarAutos() {
    for (const categoria of categorias) {
        try {
            const respuesta = await fetch(`${API_URL}?categoria=${categoria}`);
            const autos = await respuesta.json();

            const carrusel = document.getElementById(categoria);
            carrusel.innerHTML = "";

            if (autos.length === 0) {
                carrusel.innerHTML = "<p class='vacio'>No hay autos disponibles en esta categoría.</p>";
                continue;
            }

            autos.forEach(auto => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
          <img src="${auto.imagen || 'https://via.placeholder.com/300x150?text=Auto'}" alt="${auto.marca} ${auto.modelo}">
          <div class="info">
            <h3>${auto.marca} ${auto.modelo}</h3>
            <p>Año: ${auto.anio}</p>
            <p>Precio: $${Number(auto.precio).toLocaleString()}</p>
          </div>
        `;

                carrusel.appendChild(card);
            });
        } catch (error) {
            console.error(`Error al cargar ${categoria}:`, error);
            const carrusel = document.getElementById(categoria);
            carrusel.innerHTML = "<p class='vacio'>Error al cargar los autos.</p>";
        }
    }
}

// Ejecutar cuando la página cargue
document.addEventListener("DOMContentLoaded", cargarAutos);
