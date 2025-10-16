import e from 'express';
import * as modelo from '../productos/modelo.productos.mjs'

export async function ObtenerProductos(req, res) {
    // Leemos el parámetro 'categoria' de la URL
    const { categoria } = req.query;
    const datos = await modelo.ObtenerProductos(categoria); // Se lo pasamos al modelo
    res.json(datos);
}

export async function altaProducto(req, res) {
    const datosNuevosProductos = req.body
    if (!req.body || !req.body.marca || !req.body.modelo) {
        return res.status(400).json({ mensaje: "Datos Incompletos" })
    }
    try {
        const nuevosProductos = await modelo.altaProducto(datosNuevosProductos)
        console.log(nuevosProductos)
        res.status(201).json({ mensaje: "Auto Creado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Hubo un error en el servidor" })
    }
}

export async function modificarProducto(req, res) {
    const { id } = req.params
    const datosModificados = req.body
    if (!req.body || !req.body.marca || !req.body.modelo) {
        return res.status(400).json({ mensaje: "Datos Incompletos" })
    }
    try {
        const modificarProducto = await modelo.modificarProducto(id, datosModificados)
        console.log(datosModificados)
        res.status(200).json(modificarProducto)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Hubo un error en el servidor" })
    }
}