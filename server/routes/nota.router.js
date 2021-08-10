import express from 'express'
import { hasAuthorizationCurso, isAuth } from '../controllers/auth.controller.js'
import { create, findById, list, read, remove, update } from '../controllers/nota.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( create )

router.route('/:id')
    .get(isAuth,hasAuthorizationCurso, read )
    .put(isAuth,hasAuthorizationCurso, update )
    .delete(isAuth,hasAuthorizationCurso, remove )


router.param('id', findById)

export default router