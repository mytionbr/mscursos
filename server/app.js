import express from 'express'
import cors from 'cors'

import alunoRouter from './routes/aluno.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/alunos', alunoRouter)



export default app
