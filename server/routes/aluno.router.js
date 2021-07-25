import express from 'express'
import { register, listAlunos, findById, read, update } from '../controllers/aluno.controller.js'

const router = express.Router()

router.route('/')
    .get( listAlunos )
    .post( register )

router.route('/:alunoId')
    .get( read )
    .put( update )

router.param('alunoId', findById)

export default router
