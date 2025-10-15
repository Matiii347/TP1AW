import * as modelo from '../productos/modelo.productos.mjs'

export async function ObtenerProductos(req,res) {
    const datos= await modelo.ObtenerProductos()
    res.json(datos)
}