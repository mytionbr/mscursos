import pool from "../database/pool.js";
import bcrypt from 'bcrypt'
import extend from 'lodash/extend.js'
import { usuarioResponseSuccess } from '../custom/responses/usuario.response.js'


export const register = async (req,res) =>{
    try {
      
        const {nome, email, data_nascimento} = req.body
       
        const senhaDefault = bcrypt.hashSync(data_nascimento.replace('-',''),8)
        
        const { rows } = await pool.query(
            'INSERT INTO professor (nome, email, data_nascimento, senha) VALUES ($1, $2, $3, $4) RETURNING *;',
            [nome, email, data_nascimento, senhaDefault])
 
        let professorCreated = rows[0]
        
        usuarioResponseSuccess(res,professorCreated)

        } catch (err) {
            res.status(409).json({message: err.message})
        }
}

export const list = async (req,res) =>{
    try {
        const { rows } = await pool.query(
            'SELECT professor_id, nome, email, data_nascimento FROM professor ORDER BY professor_id')
        
        const professores = rows 
        
        res.status(200).json(professores)
    } catch (err){
        res.status(501).json({message: err.message})
    }
}

export const findById = async (req,res, next, id) =>{
    try {
       
        const { rows } = await pool.query(
            'SELECT * FROM professor WHERE professor_id = $1 ',
            [id])
       
        const professor = rows[0]
       
        if(!professor){
            return res.status(400).json({message: 'professor não encontrado'})
        }
        professor._id = professor.professor_id
        req.profile = professor
        next() 
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

export const read = async (req,res) => {
    
    let professor = req.profile
    usuarioResponseSuccess(res,professor)
}

export const update = async (req,res) => {
    try {
        let professor = req.profile
        professor = extend(professor, req.body)
       
        professor.senha = bcrypt.hashSync(professor.senha,8)
    
        const { rows } = await pool.query(
            'UPDATE professor SET nome = $1, email = $2, data_nascimento = $3, senha = $4 WHERE professor_id = $5 RETURNING *;',
            [professor.nome, professor.email, professor.data_nascimento, professor.senha, professor.professor_id]) 
              
        let updatedProfessor = rows[0]
       
        usuarioResponseSuccess(res,updatedProfessor)
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
} 

export const remove = async (req, res) => {
    try {
        let professor = req.profile 
        console.log(professor)
        const { rows } = await pool.query(
            'DELETE FROM professor WHERE professor_id = $1 RETURNING *;',
            [professor.professor_id]
        )

        professor = rows[0]
        usuarioResponseSuccess(res,professor)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}