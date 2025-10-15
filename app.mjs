import express from 'express'
import rutasProductos from './CRUD/modules/productos/rutas.productos.mjs'
const PUERTO = 3000
const app = express()
app.listen(PUERTO)
app.use(express.json())
app.use(rutasProductos)
app.use(express.static('./www'))