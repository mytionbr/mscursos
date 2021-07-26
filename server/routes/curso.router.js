import express from 'express'
import { create, enroll, findById, list, read, remove, update } from '../controllers/curso.controller.js'

const router = express.Router()

router.route('/')
    .post( create )
    .get( list )

router.route('/:id')
    .get( read )
    .put( update )
    .delete( remove )

router.route('/:id/matriculas/aluno/:idAluno')
    .post( enroll )

router.param('id', findById)


export default router