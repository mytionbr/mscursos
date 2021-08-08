import express from 'express'
import { hasAuthorizationCurso, isAuth } from '../controllers/auth.controller.js'
import { create, enroll, findById, findCursoByCategoriaId, find, getAluno, getAulas, listMatriculas, read, remove, unenroll, update, findByProfessor } from '../controllers/curso.controller.js'
import { remove as removeAula, create as createAula } from '../controllers/aula.controller.js'

const router = express.Router()

router.route('/')
    .post( create )
    .get( find )

    router.route('/professor/:professorId')
    .get( findByProfessor )
    
router.route('/categorias/:categoriaId')
    .get( findCursoByCategoriaId )

router.route('/:id')
    .get( read )
    .put( isAuth,hasAuthorizationCurso,update )
    .delete(isAuth,hasAuthorizationCurso, remove )

router.route('/:id/matriculas/')
    .get( listMatriculas )

router.route('/:id/matriculas/:alunoId')
    .post( enroll )
    .get( getAluno )
    .delete( unenroll )

router.route('/:id/aulas')
    .get( getAulas )
    .post(isAuth,hasAuthorizationCurso,createAula)

router.route('/:id/aulas/:aulaId')
    .get( isAuth,hasAuthorizationCurso,removeAula )


router.param('id', findById)


export default router