import express from 'express'
import { signinProfessor } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/professor/signin')
    .post(signinProfessor)

export default router