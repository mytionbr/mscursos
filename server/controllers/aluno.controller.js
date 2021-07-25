import pool from '../database/pool.js'
import bcrypt from 'bcrypt'


export const create = async (req,res) => {
    
    try{
        const { nome, email, dataNascimento } = req.body
        
        const senha =  bcrypt.hashSync(dataNascimento.replace('-',''),8)

        const{ rows } = await pool.query(
            'INSERT INTO aluno(nome, email, data_nascimento, senha) VALUES ($1,$2,$3,$4) RETURNING *;',
            [nome, email, dataNascimento, senha]
        )   

        let userCreated = rows[0]
        userCreated.senha = undefined

        res.status(200).json(userCreated)
        } catch (err){
            res.status(409).json({message: err.message})
        }
    }
