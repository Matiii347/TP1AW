// Enrutamiento de los endpoints
import express from 'express'
import * as controlador from './controlador.productos.mjs'
import { verificarToken } from '../auth/middleware.auth.mjs'
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
rutasProductos.post(RUTA_BASE, verificarToken, controlador.altaProducto)
// Modificar 1
rutasProductos.put(RUTA_BASE + '/:id', verificarToken, controlador.modificarProducto)
// Elimiar 1
rutasProductos.delete(RUTA_BASE + '/:id', verificarToken, controlador.eliminarProducto)

export default rutasProductos


