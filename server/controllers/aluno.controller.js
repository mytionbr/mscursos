import pool from '../database/pool.js'
import bcrypt from 'bcrypt'


export const register = async (req,res) => {
    
    try{
        const { nome, email, dataNascimento } = req.body
        
        /*O sistema vai definir como senha default a data de nascimento do 
            aluno em formato americano: ex 2000-02-05 as 20000205 */
        const senha =  bcrypt.hashSync(dataNascimento.replace('-',''),8)

        const{ rows } = await pool.query(
            'INSERT INTO aluno(nome, email, data_nascimento, senha) VALUES ($1,$2,$3,$4) RETURNING *;',
            [nome, email, dataNascimento, senha]
        )   

        let alunoCreated = rows[0]
        alunoCreated.senha = undefined

        res.status(200).json(alunoCreated)
        } catch (err){
            res.status(409).json({message: err.message})
        }
    }

export const listAlunos = (async (req,res) => {
    try {
        const { rows } = await pool.query(
            'SELECT aluno_id, nome, email, data_nascimento FROM aluno'
        )

        const listAlunos = rows

        res.status(200).json(listAlunos)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

export const findById = (async (req,res, next, id) => {
    try{
        const { rows } = await pool.query(
            'SELECT * FROM aluno WHERE aluno_id = $1',
            [id])
        
        let aluno = rows[0]

        if (!aluno){
            return res.status(400).json({
                message: "Aluno não encontrado" 
            })}
        
        req.profile = aluno
        next()
        } catch (err) {
            return res.status(400).json({
                message: 'Não foi possível recuperar o aluno'
            })
        }
})

export const read = ( async (req, res) => {
        req.profile.senha = undefined
        return res.json(req.profile)        
})