import pool from '../../config/conexion-BD.mjs'

export async function ObtenerProductos() {
    const resultado = await pool.query('Select * from autos')
    const productos = resultado.rows
    return productos
}