import express from 'express'
import cors from 'cors'

import alunoRouter from './routes/aluno.router.js'
import professorRouter from './routes/professor.router.js'
import cursoRouter from './routes/curso.router.js'
import notaRouter from './routes/nota.router.js'
import aulaRouter from './routes/aula.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/alunos', alunoRouter)
app.use('/api/professores', professorRouter)
app.use('/api/cursos', cursoRouter)
app.use('/api/notas', notaRouter)
app.use('/api/aulas', aulaRouter)

export default app
