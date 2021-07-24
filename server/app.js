import express from 'express'
import cors from 'cors'


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const app = express()


export default app
