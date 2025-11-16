//Importamos paquete conector pg
import 'dotenv/config' // ¡Importante! Añade esto al inicio
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
export default pool;

//suprabase para usar postresql online
//para ver las imagenes de docker hub.docker
//modelcontextprotocol.io


