import express from 'express'
import * as control from './controlador.auth.mjs'
const RUTA_BASE_REGISTRO = '/api/auth/register'
const RUTA_BASE_LOGIN = '/api/auth/login'
const rutaAuth = new express.Router()

rutaAuth.post(RUTA_BASE_REGISTRO, control.registro)

rutaAuth.post(RUTA_BASE_LOGIN, control.registroLogin)