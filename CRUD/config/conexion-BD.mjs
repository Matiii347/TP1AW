//Importamos paquete conector pg
import { Pool } from 'pg'

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'pass',
    database: 'tp1'
})
export default pool;



//suprabase para usar postresql online
//para ver las imagenes de docker hub.docker
//modelcontextprotocol.io


