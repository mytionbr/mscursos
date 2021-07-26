import express from 'express'
import { create, findById, list, read, remove, update } from '../controllers/nota.controller.js'

const router = express.Router()

router.route('/')
    .get( list )
    .post( create )

router.route('/:id')
    .get( read )
    .put( update )
    .delete( remove )

router.param('id', findById)

export default router