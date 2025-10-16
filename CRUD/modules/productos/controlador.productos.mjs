import * as modelo from '../productos/modelo.productos.mjs'

export async function ObtenerProductos(req, res) {
    // Leemos el parámetro 'categoria' de la URL
    const { categoria } = req.query;
    const datos = await modelo.ObtenerProductos(categoria); // Se lo pasamos al modelo
    res.json(datos);
}