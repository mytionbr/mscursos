import express from 'express'
import { create } from '../controllers/assinatura.controller.js'
import { isAuth } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .post(isAuth,create)

export default router