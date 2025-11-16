import express from 'express'
import cookieParser from 'cookie-parser'
import rutasProductos from './CRUD/modules/productos/rutas.productos.mjs'
import { verificarToken } from './CRUD/modules/auth/middleware.auth.mjs'
const PUERTO = 3000
const app = express()
app.listen(PUERTO)
app.use(express.json())
app.use(cookieParser())
app.use(rutasProductos)
app.use(express.static('./www'))
//Servir el panel de administración en la ruta /admin
app.use('/panel', express.static('./CRUD/www-admin'))