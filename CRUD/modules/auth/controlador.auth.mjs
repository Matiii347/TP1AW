import * as modelo from './modelo.auth.mjs'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registro(req, res) {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ mensaje: "Datos incompletos." });
    }
    try {
        const passHash = await bcrypt.hash(password, 10);
        const usuarioNuevo = await modelo.crearUsuario(username, passHash)

        res.status(201).json({ id: usuarioNuevo.id, username: usuarioNuevo.username });
    } catch (error) {
        console.error("❌ ERROR AL CREAR EL Usuario:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor." });
    }
}

export async function registroLogin(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ mensaje: "Datos incompletos." });
        }
        const login = await modelo.traerUsuarioPorUsername(username)
        if (!login) {
            return res.status(401).json({ mensaje: "Usuario o Contraseña Incorrecta" });
        }
        const validarClave = await bcrypt.compare(password, login.password)
        if (!validarClave) {
            return res.status(401).json({ mensaje: "Usuario o Contraseña Incorrecta" });
        }
        const token = jwt.sign(
            { id: login.id, username: login.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })
        res.status(200).json({ mensaje: "Login exitoso" })

    } catch (error) {
        console.error("❌ ERROR EN EL LOGIN:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor." });
    }
}