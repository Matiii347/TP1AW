import pool from '../../config/conexion-BD.mjs'

export async function ObtenerProductos(categoria) {
    let consulta = 'SELECT * FROM autos';
    const valores = [];
    if (categoria) {
        consulta += ' WHERE categoria = $1';
        valores.push(categoria);
    }
    const resultado = await pool.query(consulta, valores);
    return resultado.rows;
}

export async function altaProducto(datos) {
    try {
        const { marca, modelo, anio, precio, categoria, imagen } = datos;
        const resultado = await pool.query(
            "INSERT INTO autos(marca, modelo, anio, precio, categoria, imagen) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [marca, modelo, anio, precio, categoria, imagen]
        );
        return resultado.rows[0];
    } catch (error) {
        throw error;
    }
}

export async function modificarProducto(id, datos) {
    const { marca, modelo, anio, precio, categoria, imagen } = datos;
    const consulta = `
        UPDATE autos 
        SET marca = $1, modelo = $2, anio = $3, precio = $4, categoria = $5, imagen = $6 
        WHERE id = $7 
        RETURNING *`;
    const valores = [marca, modelo, anio, precio, categoria, imagen, id];
    try {
        const resultado = await pool.query(consulta, valores);
        return resultado.rows[0] || null;
    } catch (error) {
        throw error;
    }
}