import express from 'express'
import pool from './conexion-bd.mjs'

const PUERTO = 3000

const app = express()

app.listen(PUERTO, () => {
    console.log('Servidor corriendo')
})

// -------------------
app.get('/productos', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM productos')
    const productos = resultado.rows
    res.json(productos)
})


app.use((req, res) => {
    res.status(404).json({ mensaje: 'Recurso no encontrado' })
})