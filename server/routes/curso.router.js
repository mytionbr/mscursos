import express from 'express'
import { create, enroll, findById, getAluno, list, listMatriculas, read, remove, unenroll, update } from '../controllers/curso.controller.js'

const router = express.Router()

router.route('/')
    .post( create )
    .get( list )

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


router.param('id', findById)


export default router