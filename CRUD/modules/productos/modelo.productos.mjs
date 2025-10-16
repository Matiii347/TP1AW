import pool from '../../config/conexion-BD.mjs'

export async function ObtenerProductos(categoria) {
    let consulta = 'SELECT * FROM autos';
    const valores = [];

    if (categoria) {
        consulta += ' WHERE categoria = $1'; // Agregamos el filtro
        valores.push(categoria);
    }

    const resultado = await pool.query(consulta, valores);
    const productos = resultado.rows;
    return productos;
}

export async function ObtenerProducto(id) {
    /*
    Logica peticion y respuesta
    */
}

export async function altaProducto(datos) {
    try {
        const { marca, modelo, anio, precio, categoria, imagen } = datos;
        // La consulta y los valores se pasan como dos argumentos separados por una coma
        const resultado = await pool.query(
            "INSERT INTO autos(marca, modelo, año, precio, categoria, imagen) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
            [marca, modelo, anio, precio, categoria, imagen] // <-- El array ahora está dentro
        );
        return resultado.rows;
    } catch (error) {
        throw error;
    }
}
/*
Modificar,eliminar
*/
export async function modificarProducto(id, datos) {
    const { marca, modelo, anio, precio, categoria, imagen } = datos;

    // 1. La consulta SQL para actualizar. 
    const consulta = `
        UPDATE autos 
        SET marca = $1, modelo = $2, anio = $3, precio = $4, categoria = $5, imagen = $6 
        WHERE id = $7 
        RETURNING *`; // "RETURNING *" hace que la BD nos devuelva el registro actualizado

    // 2. El array de valores en el orden correcto ($1, $2, ..., $7)
    const valores = [marca, modelo, anio, precio, categoria, imagen, id];

    try {
        const resultado = await pool.query(consulta, valores);
        // 3. Si la consulta no afectó a ninguna fila, resultado.rows estará vacío
        return resultado.rows[0] || null;
    } catch (error) {
        throw error;
    }
}