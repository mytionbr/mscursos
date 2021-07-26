import express from 'express'
import { read } from '../controllers/aluno.controller.js'
import { findById, list, register, remove, update } from '../controllers/professor.controller.js'

const router = express.Router()

router.route('/')
    .post(register)
    .get(list)

router.route('/:id')
    .get(read)
    .put(update)
    .delete(remove)

router.param('id', findById)


export default router