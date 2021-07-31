import express from 'express'
import { read } from '../controllers/aluno.controller.js'
import { isAuthProfessor } from '../controllers/auth.controller.js'
import { findById, list, register, remove, update } from '../controllers/professor.controller.js'

const router = express.Router()

router.route('/')
    .post(isAuthProfessor,register)
    .get(list)

router.route('/:id')
    .get(isAuthProfessor,read)
    .put(isAuthProfessor,update)
    .delete(isAuthProfessor,remove)

router.param('id', findById)


export default router