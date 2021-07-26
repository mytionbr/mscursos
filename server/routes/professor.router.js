import express from 'express'
import { read } from '../controllers/aluno.controller.js'
import { findById, list, register, update } from '../controllers/professor.controller.js'

const router = express.Router()

router.route('/')
    .post(register)
    .get(list)

router.route('/:id')
    .get(read)
    .put(update)

router.param('id', findById)


export default router