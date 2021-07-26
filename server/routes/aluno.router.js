import express from 'express'
import { register, list, findById, read, update, remove } from '../controllers/aluno.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( register )

router.route('/:id')
    .get( read )
    .put( update )
    .delete( remove )

router.param('id', findById)

export default router
