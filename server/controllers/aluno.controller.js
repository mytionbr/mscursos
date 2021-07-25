import pool from '../database/pool.js'

export const create = async (req,res) => {
    try{
        const { nome, email, dataNascimento } = req.body

        const{ rows } = await pool.query(
            'INSERT INTO aluno(nome, email, data_nascimento) VALUES ($1,$2,$3) RETURNING *;',
            [nome, email, dataNascimento]
        )       
            res.status(200).json(rows[0])
        } catch (err){
            res.status(409).json({message: err.message})
        }
    }
