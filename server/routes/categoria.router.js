import express from 'express'
import { list } from '../controllers/categorias.controller.js'

const router = express.Router()

router.route('/')
    .get( list )


export default router
