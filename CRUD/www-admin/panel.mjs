const API_URL = "http://localhost:3000/api/autos";

// --- LÓGICA DE ADMINISTRACIÓN ---

// ALTA DE AUTOS
const formAlta = document.getElementById('form-alta');
formAlta.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formAlta);
    const auto = Object.fromEntries(formData.entries());

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(auto)
        });
        if (respuesta.ok) {
            alert('¡Auto creado con éxito!');
            formAlta.reset();
        } else {
            throw new Error('Error al crear el auto.');
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo crear el auto.');
    }
});

// MODIFICAR AUTOS
const formBuscarModificar = document.getElementById('form-buscar-modificar');
const formModificar = document.getElementById('form-modificar');

formBuscarModificar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id-buscar-modificar').value;
    try {
        const respuesta = await fetch(API_URL);
        const autos = await respuesta.json();
        const auto = autos.find(a => a.id == id);

        if (auto) {
            formModificar.innerHTML = `
                <input type="hidden" name="id" value="${auto.id}">
                <input type="text" name="marca" value="${auto.marca}" required>
                <input type="text" name="modelo" value="${auto.modelo}" required>
                <input type="number" name="anio" value="${auto.anio}" required>
                <input type="number" name="precio" value="${auto.precio}" required>
                <select name="categoria" required>
                    <option value="hatchback" ${auto.categoria === 'hatchback' ? 'selected' : ''}>Hatchback</option>
                    <option value="utilitario" ${auto.categoria === 'utilitario' ? 'selected' : ''}>Utilitario</option>
                    <option value="deportivo" ${auto.categoria === 'deportivo' ? 'selected' : ''}>Deportivo</option>
                </select>
                <input type="text" name="imagen" value="${auto.imagen}">
                <button type="submit">Actualizar Auto</button>
            `;
            formModificar.classList.remove('hidden');
        } else {
            alert('Auto no encontrado.');
            formModificar.classList.add('hidden');
        }
    } catch (error) {
        console.error(error);
        alert('Error al buscar el auto.');
    }
});

formModificar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formModificar);
    const auto = Object.fromEntries(formData.entries());
    const id = auto.id;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(auto)
        });
        if (respuesta.ok) {
            alert('¡Auto modificado con éxito!');
            formModificar.reset();
            formModificar.classList.add('hidden');
            formBuscarModificar.reset();
        } else {
            throw new Error('Error al modificar el auto.');
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo modificar el auto.');
    }
});

// BAJA DE AUTOS
const formBuscarBaja = document.getElementById('form-buscar-baja');
const infoBaja = document.getElementById('info-baja');

formBuscarBaja.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id-buscar-baja').value;
    try {
        const respuesta = await fetch(API_URL);
        const autos = await respuesta.json();
        const auto = autos.find(a => a.id == id);

        if (auto) {
            infoBaja.innerHTML = `
                <p>¿Seguro que deseas eliminar el auto ID ${auto.id}: ${auto.marca} ${auto.modelo}?</p>
                <button id="btn-confirmar-baja" data-id="${auto.id}">Confirmar Eliminación</button>
            `;
            infoBaja.classList.remove('hidden');

            document.getElementById('btn-confirmar-baja').addEventListener('click', async (e) => {
                const idParaBorrar = e.target.dataset.id;
                try {
                    const respDelete = await fetch(`${API_URL}/${idParaBorrar}`, { method: 'DELETE' });
                    if (respDelete.ok) {
                        alert('¡Auto eliminado con éxito!');
                        infoBaja.classList.add('hidden');
                        formBuscarBaja.reset();
                    } else { throw new Error('Error en el servidor al eliminar'); }
                } catch (err) {
                    alert('No se pudo eliminar el auto.');
                }
            });

        } else {
            alert('Auto no encontrado.');
            infoBaja.classList.add('hidden');
        }
    } catch (error) {
        console.error(error);
        alert('Error al buscar el auto.');
    }
});