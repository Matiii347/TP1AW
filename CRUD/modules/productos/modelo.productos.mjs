import pool from '../../config/conexion-BD.mjs'

export async function ObtenerProductos(categoria) {
    let consulta = 'SELECT * FROM autos';
    const valores = [];

    if (categoria) {
        consulta += ' WHERE categoria = $1'; // Agregamos el filtro
        valores.push(categoria);
    }

    const resultado = await pool.query(consulta, valores);
    const productos = resultado.rows;
    return productos;
}

export async function ObtenerProducto(id) {
    /*
    Logica peticion y respuesta
    */
}

export async function altaProducto(datos) {
    try {
        const { marca, modelo, año, precio, categoria, imagen } = datos
        const resultado = await pool.query(
            "INSERT INTO autos(marca, modelo, año, precio, categoria, imagen) VALUES($1,$2,$3,$4,$5,$6) RETURNING id"
            [marca, modelo, año, precio, categoria, imagen])
        return resultado.rows
    } catch (error) {
        throw error
    }

}

/*
Modificar,eliminar
*/
export async function modificarProducto(params) {
    
}