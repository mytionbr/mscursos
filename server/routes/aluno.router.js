import express from 'express'
import { register, listAlunos, findById, read, update, remove } from '../controllers/aluno.controller.js'

const router = express.Router()

router.route('/')
    .get( listAlunos )
    .post( register )

router.route('/:alunoId')
    .get( read )
    .put( update )
    .delete( remove )

router.param('alunoId', findById)

export default router
