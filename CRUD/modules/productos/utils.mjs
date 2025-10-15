export function chequearDatosProductos(req, res, next){
    // const datosProductos = req.body
    // Desestructuramos
    const {nombre, precio} = req.body
    // Chequeamos
    // null o undefined o false o '' <---- se evalua como falso
    if(!nombre || !precio){
        res.status(400).json({mensaje: 'Datos incompletos'})
    }else{
        next()
    }
}