import pool from '../database/pool.js'
import bcrypt from 'bcrypt'
import extend from 'lodash/extend.js'


export const register = async (req,res) => {
    
    try{
        const { nome, email, dataNascimento } = req.body
        
        /*O sistema vai definir como senha default a data de nascimento do 
            aluno em formato americano: ex 2000-02-05 as 20000205 */
        const senhaDefault =  bcrypt.hashSync(dataNascimento.replace('-',''),8)

        const{ rows } = await pool.query(
            'INSERT INTO aluno(nome, email, data_nascimento, senha) VALUES ($1, $2, $3, $4) RETURNING *;',
            [nome, email, dataNascimento, senhaDefault]
        )   

        let createdAluno = rows[0]
        createdAluno.senha = undefined

        res.status(201).json(createdAluno)
        } catch (err){
            res.status(409).json({message: err.message})
        }
    }

export const list = async (req,res) => {
    try {
        const { rows } = await pool.query(
            'SELECT aluno_id, nome, email, data_nascimento FROM aluno ORDER BY aluno_id'
        )

        const listAlunos = rows

        res.status(200).json(listAlunos)
    } catch (err){
        res.status(501).json({message: err.message})
    }
}

export const findById = async (req,res, next, id) => {
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
}

export const read =  async (req, res) => {
        req.profile.senha = undefined
        return res.json(req.profile)        
}

export const update = async (req, res) => {
    try {
        let aluno = req.profile
        aluno = extend(aluno, req.body)
        
        aluno.senha = bcrypt.hashSync(aluno.senha,8)

        const { rows } = await pool.query(
            'UPDATE aluno SET nome = $1, email = $2, data_nascimento = $3, senha = $4 WHERE aluno_id = $5 RETURNING *;',
            [aluno.nome, aluno.email, aluno.dataNascimento, aluno.senha, aluno.aluno_id])
        
        let updatedAluno = rows[0]

        updatedAluno.senha = undefined

        res.status(200).json(updatedAluno)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

export const remove = async (req, res) =>{
    try {
        let aluno = req.profile
        const { rows } = await pool.query(
            'DELETE FROM aluno WHERE aluno_id = $1 RETURNING *;',
            [aluno.aluno_id])
        
        aluno = rows[0]
        aluno.senha = undefined

        res.status(200).json({message: 'Aluno Deletado', aluno: aluno})

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}