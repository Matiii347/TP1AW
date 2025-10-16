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