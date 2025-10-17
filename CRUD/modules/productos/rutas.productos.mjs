// Enrutamiento de los endpoints
import express from 'express'
import * as controlador from './controlador.productos.mjs'
//import { chequearDatosProductos } from './utils.mjs'

// Ruta base
const RUTA_BASE = '/api/autos'
// Creamos una sub-instancia para enrutar
const rutasProductos = new express.Router()
// rutasProductos.use(RUTA_BASE, chequearDatosProductos)
// Traer Todos
rutasProductos.get(RUTA_BASE, controlador.ObtenerProductos)
// Traer 1
//rutasProductos.get(RUTA_BASE + '/:id', controlador.ObtenerProductos)
// Agregar 1
rutasProductos.post(RUTA_BASE, controlador.altaProducto)
// Modificar 1
rutasProductos.put(RUTA_BASE + '/:id', controlador.modificarProducto)
// Elimiar 1
rutasProductos.delete(RUTA_BASE + '/:id', controlador.eliminarProducto)

export default rutasProductos


