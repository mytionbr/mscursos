import express from 'express'
import { create } from '../controllers/aluno.controller.js'

const router = express.Router()

router.post('/', create)

export default router
