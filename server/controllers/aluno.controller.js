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
