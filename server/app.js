import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import alunoRouter from './routes/aluno.router.js'
import professorRouter from './routes/professor.router.js'
import cursoRouter from './routes/curso.router.js'
import notaRouter from './routes/nota.router.js'
import aulaRouter from './routes/aula.router.js'
import categoriaRouter from './routes/categoria.router.js'
import authRouter from './routes/auth.router.js'
import assinaturaRouter from './routes/assinatura.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(fileUpload())

app.use('/api/alunos', alunoRouter)
app.use('/api/professores', professorRouter)
app.use('/api/cursos', cursoRouter)
app.use('/api/notas', notaRouter)
app.use('/api/aulas', aulaRouter)
app.use('/api/categorias', categoriaRouter)
app.use('/api/auth', authRouter)
app.use('/api/assinaturas', assinaturaRouter)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
export default app
