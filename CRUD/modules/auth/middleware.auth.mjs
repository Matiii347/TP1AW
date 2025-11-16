import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ mensaje: "Acceso Denegado" })
    }
    try {
        const verificar = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(400).json({ mensaje: "Token invalido" })
    }
}
