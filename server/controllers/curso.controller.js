import extend from 'lodash/extend.js'
import pool from "../database/pool.js"

export const create = async (req,res) => {
    try {
        const {nome, descricao, professorId} = req.body

        const { rows } = await pool.query(
            'INSERT INTO curso (nome, descricao, professor_id) VALUES ($1, $2, $3)  RETURNING *;',
            [nome, descricao, professorId])
        
        const cursoCreated = rows[0]

        if(!cursoCreated) {
            return res.status(400).json({message: 'Erro ao criar o curso'})
        }

        res.status(201).json(cursoCreated)        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const list = async (req,res) => {
    try {
        const { rows } = await pool.query(
            'SELECT curso_id, nome, descricao, professor_id FROM curso')

        const cursosList = rows
        
        res.status(200).json(cursosList)        
    } catch (err) {
        res.status(501).json({message: err.message})
    }
}

export const findById = async (req,res, next, id) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM curso WHERE curso_id = $1',
            [id]
        )

        const curso = rows[0]

        if (!curso){
            return res.status(400).json({message: 'curso não encontrado'})
        }

        req.profile = curso
        next()

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

export const read = async (req,res) => {
    const curso = req.profile
    res.status(200).json(curso)
}

export const update = async (req,res) => {
    try {
        let curso = req.profile
        curso = extend(curso, req.body)
       
        const { rows } = await pool.query(
            'UPDATE curso SET nome = $1, descricao = $2, professor_id = $3 WHERE curso_id = $4 RETURNING *;',
            [curso.nome, curso.descricao, curso.professor_id, curso.curso_id]
        )

        const updatedCurso = rows[0]

        res.status(200).json(updatedCurso)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const remove = async (req, res) =>{
    try {
        const curso = req.profile

        const { rows } = await pool.query(
            'DELETE FROM curso WHERE curso_id = $1 RETURNING *;',
            [curso.curso_id]
        )

        res.status(200).json({
            message: 'curso deletado com sucesso',
            curso: curso 
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const enroll = async (req,res) => {
    try {
        const curso = req.profile
        const aluno_id = req.params['alunoId']
        
        const { rows } = await pool.query(
            `
            INSERT INTO curso_aluno (curso_id, aluno_id)
            SELECT $1, $2
            WHERE  NOT EXISTS (
               SELECT 1 FROM curso_aluno
               WHERE (curso_id, aluno_id) = ($3, $4)) RETURNING *;
            `,
            [curso.curso_id,aluno_id,curso.curso_id,aluno_id])

        const matricula = rows[0]
        
        if(!matricula){
            return res.status(400).json({
                message: 'A matricula já existe',
            })
        }

        res.status(200).json({
            message: 'matricula realizada com sucesso',
            matricula: matricula
        })

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const listMatriculas = async (req,res) => {
   try {
        const curso = req.profile
        const { rows } = await pool.query(
            'SELECT * FROM curso_aluno WHERE curso_id = $1',
            [curso.curso_id]
        )
    
        const listMatriculas = rows

        res.status(200).json(listMatriculas)
    
   } catch (err) {
        res.status(400).json({message:err.message})
   }
}

export const getAluno = async (req,res) => {
    try {
         const curso = req.profile
         const aluno_id = req.params['alunoId']

         const { rows } = await pool.query(
             'SELECT * FROM curso_aluno WHERE curso_id = $1 AND aluno_id = $2',
             [curso.curso_id, aluno_id]
         )
     
         const matricula = rows
 
         res.status(200).json(matricula)
     
    } catch (err) {
         res.status(400).json({message:err.message})
    }
 }

 export const unenroll = async (req,res) => {
    try {
         const curso = req.profile
         const aluno_id = req.params['alunoId']

         const { rows } = await pool.query(
             'DELETE FROM curso_aluno WHERE curso_id = $1 AND aluno_id = $2',
             [curso.curso_id, aluno_id]
         )
 
         res.status(200).json({message: 'Aluno desmatriculado com sucesso'})
     
    } catch (err) {
         res.status(400).json({message:err.message})
    }
 }

