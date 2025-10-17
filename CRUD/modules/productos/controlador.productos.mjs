import * as modelo from '../productos/modelo.productos.mjs'

export async function ObtenerProductos(req, res) {
    const { categoria } = req.query;
    const datos = await modelo.ObtenerProductos(categoria);
    res.json(datos);
}

export async function altaProducto(req, res) {
    const datosNuevosAuto = req.body;

    if (!datosNuevosAuto || !datosNuevosAuto.marca || !datosNuevosAuto.modelo) {
        return res.status(400).json({ mensaje: "Datos incompletos." });
    }

    try {
        const autoCreado = await modelo.altaProducto(datosNuevosAuto);
        res.status(201).json(autoCreado);

    } catch (error) {
        console.error("❌ ERROR AL CREAR EL AUTO:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor." });
    }
}

export async function modificarProducto(req, res) {
    const { id } = req.params;
    const datosModificados = req.body;

    if (!datosModificados || !datosModificados.marca || !datosModificados.modelo) {
        return res.status(400).json({ mensaje: "Datos Incompletos" });
    }

    try {
        const autoModificado = await modelo.modificarProducto(id, datosModificados);

        if (!autoModificado) {
            return res.status(404).json({ mensaje: "Auto no encontrado." });
        }

        res.status(200).json(autoModificado);
    } catch (error) {
        console.error("❌ ERROR AL MODIFICAR EL AUTO:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
}

export async function eliminarProducto(req, res) {
    const { id } = req.params
    try {
        const eliminarAuto = await modelo.eliminarProducto(id);

        if (eliminarAuto === 0) {
            return res.status(404).json({ mensaje: "Auto no encontrado para eliminar." });
        }

        res.status(204).send()
    } catch (error) {
        console.error("❌ ERROR AL Eliminar EL AUTO:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
}