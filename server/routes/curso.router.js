import express from 'express'
import { create, enroll, findById, findCursoByCategoriaId, findCursosByCategoriaGroup, getAluno, getAulas, list, listMatriculas, read, remove, unenroll, update } from '../controllers/curso.controller.js'

const router = express.Router()

router.route('/')
    .post( create )
    .get( list )


router.route('/filtro')
    .get( findCursosByCategoriaGroup )

router.route('/categorias/:categoriaId')
    .get( findCursoByCategoriaId )

router.route('/:id')
    .get( read )
    .put( update )
    .delete( remove )

router.route('/:id/matriculas/')
    .get( listMatriculas )

router.route('/:id/matriculas/:alunoId')
    .post( enroll )
    .get( getAluno )
    .delete( unenroll )

router.route('/:id/aulas')
    .get( getAulas )



router.param('id', findById)


export default router