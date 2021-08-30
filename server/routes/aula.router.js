import express from 'express'
import { create, findById, list, read, remove, update } from '../controllers/aula.controller.js'
import { isAuth } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( create )

router.route('/:id')
    .get( isAuth,read )
    .put( update )
    .delete( remove )  

router.param('id', findById)

export default router