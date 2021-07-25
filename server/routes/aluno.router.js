import express from 'express'
import { register, listAlunos, findById, read } from '../controllers/aluno.controller.js'

const router = express.Router()

router.route('/')
    .get( listAlunos )
    .post( register )

router.route('/:alunoId')
    .get( read )

router.param('alunoId', findById)

export default router
