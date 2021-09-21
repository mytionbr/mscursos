import pool from "../database/pool.js";
import bcrypt from 'bcrypt'
import extend from 'lodash/extend.js'
import { generateToken } from "../utils/generateToken.js";
import { professorResponseSuccess } from "../custom/responses/professor.response.js";


export const register = async (req,res) =>{
    try {
      
        const {nome, email, data_nascimento,descricao} = req.body
       
        const senhaDefault = bcrypt.hashSync(data_nascimento.replace('-',''),8)
        const { rows } = await pool.query(
            'INSERT INTO professor (nome, email, data_nascimento, senha,descricao) VALUES ($1, $2, $3, $4,$5) RETURNING *;',
            [nome, email, data_nascimento, senhaDefault,descricao])
 
        let professorCreated = rows[0]
        
        professorCreated.data_nascimento = undefined
        professorCreated.descricao = undefined

        professorResponseSuccess(res,professorCreated)

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
    professorResponseSuccess(res,professor)
}


export const update = async (req,res) => {
    try {
        let professor = req.profile
        const senha = professor.senha
        professor = extend(professor, req.body)

        if(req.body.senha && req.body.senha !== ''){
            professor.senha = bcrypt.hashSync(professor.senha,8)
        } else {
            professor.senha = senha
        }
      
        const { rows } = await pool.query(
            'UPDATE professor SET nome = $1, email = $2, data_nascimento = $3, senha = $4, descricao = $5 WHERE professor_id = $6 RETURNING *;',
            [professor.nome, professor.email, professor.data_nascimento, professor.senha,professor.descricao, professor.professor_id]) 
              
        let updatedProfessor = rows[0]
        
        updatedProfessor.token = generateToken({
            _id: professor.professor_id,
            nome: professor.nome,
            email: professor.email
        })

        updatedProfessor.data_nascimento = undefined
        updatedProfessor.descricao = undefined

        professorResponseSuccess(res,updatedProfessor)
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
} 

export const remove = async (req, res) => {
    try {
        let professor = req.profile 

        const { rows } = await pool.query(
            'DELETE FROM professor WHERE professor_id = $1 RETURNING *;',
            [professor.professor_id]
        )

        professor = rows[0]
        professorResponseSuccess(res,professor)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

export const findAssignments = async (req,res)=>{
    try{
        const professor = req.profile
        
        const { rows } = await pool.query(
            `
            (SELECT COUNT(*) FROM 
                CURSO WHERE CURSO.PROFESSOR_ID = $1)
                UNION ALL
            (SELECT COUNT(*) FROM 
                (MATRICULA INNER JOIN CURSO ON MATRICULA.CURSO_ID = CURSO.CURSO_ID)
                WHERE CURSO.PROFESSOR_ID = $1)
                UNION ALL
            (SELECT COUNT(*) FROM
                (AULA INNER JOIN CURSO ON AULA.CURSO_ID = CURSO.CURSO_ID)
                WHERE CURSO.PROFESSOR_ID = $1)
            `,
            [professor.professor_id]
        )

        const result = {
            totalCursos: rows[0],
            totalAlunos: rows[1],
            totalAulas: rows[2]
        }

        res.status(200).json(result)

    } catch (err){
        res.status(400).json({
            message: err.message
        })
    }
}


