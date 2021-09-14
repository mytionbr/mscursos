import express from 'express'
import { register, list, findById, read, update, remove, findDetails } from '../controllers/aluno.controller.js'
import { hasAuthorization, isAuth } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( register )

router.route('/:id')
    .get(isAuth,hasAuthorization, read )
    .put(isAuth,hasAuthorization, update )
    .delete(isAuth,hasAuthorization, remove )

router.route('/details/:alunoId')
    .get(isAuth, findDetails )


router.param('id', findById)

export default router
