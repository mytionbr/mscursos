import express from 'express'
import { hasAuthorization, isAuth } from '../controllers/auth.controller.js'
import { findById, list, register, remove, update, read, findAssignments } from '../controllers/professor.controller.js'

const router = express.Router()

router.route('/')
    .post(isAuth,register)
    .get(list)

router.route('/:id')
    .get(isAuth,hasAuthorization,read)
    .put(isAuth,hasAuthorization,update)
    .delete(isAuth,hasAuthorization,remove)

router.route('/:id/atribuicoes')
    .get(isAuth,hasAuthorization,findAssignments)


router.param('id', findById)


export default router