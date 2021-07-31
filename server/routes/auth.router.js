import express from 'express'
import { signinAluno, signinProfessor } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/professor/signin')
    .post(signinProfessor)

router.route('/aluno/signin')
    .post(signinAluno)

export default router