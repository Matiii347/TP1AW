import pool from '../../config/conexion-BD.mjs'

export async function crearUsuario(username, passHash) {
    const crear = `
    INSERT INTO usuarios (username,password)
    VALUES ($1,$2)
    RETURNING id,username
    `
    try {
        const bd = await pool.query(crear, [username, passHash])
        return bd.rows[0]
    } catch (error) {
        throw error
    }
}

export async function traerUsuarioPorUsername(username) {
    const crear = `
    SELECT * FROM usuarios WHERE username = $1`
    try {
        const bd = await pool.query(crear, [username])
        return bd.rows[0]
    } catch (error) {
        throw error
    }
}