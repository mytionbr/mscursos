import express from 'express'
import { create, findById,  findByIdAndAluno,  finishAula,  list,  remove, update } from '../controllers/aula.controller.js'
import { hasAuthorizationAula, isAuth } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( create )

router.route('/:id')
    .get( isAuth, findById)
    .put( update )
    .delete( remove )  

router
    .route("/:id/finish")
    .post(isAuth, hasAuthorizationAula, finishAula)

router
    .route("/:id/aluno")
    .get(isAuth, hasAuthorizationAula, findByIdAndAluno)
  


export default router