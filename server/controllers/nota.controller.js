import pool from '../database/pool.js'
import extend from 'lodash/extend.js'
import { isAprovado } from '../utils/aprovado.js'

export const create = async (req,res) => {
    try {
        const { valor, curso_id, aluno_id } = req.body

        const aprovado = isAprovado(valor)

        const { rows } = await pool.query(
            'INSERT INTO nota (valor, aprovado, curso_id, aluno_id) VALUES ($1, $2, $3, $4) RETURNING *;',
            [valor, aprovado, curso_id, aluno_id])

        let createdNota = rows[0]

        res.status(201).json(createdNota)
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

export const list = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM nota',
            [])
        
        const listNotas = rows

        res.status(200).json(listNotas)
    } catch (err) {
        res.status(501).json({message: err.message})
    }
}

export const findById = async (req, res, next, id) => {
    try{
        const { rows } = await pool.query(
            `SELECT NOTA.ALUNO_ID as aluno_id, NOTA.CURSO_ID as curso_id,NOTA.NOTA_ID as nota_id, 
            ALUNO.NOME as aluno_nome, ALUNO.EMAIL as aluno_email, CURSO.NOME as curso_nome,
			NOTA.VALOR as valor, NOTA.APROVADO as aprovado, CURSO.PROFESSOR_ID as professor_id
            FROM ALUNO INNER JOIN NOTA ON NOTA.ALUNO_ID = ALUNO.ALUNO_ID
            INNER JOIN CURSO ON NOTA.CURSO_ID = CURSO.CURSO_ID
            WHERE NOTA.NOTA_ID = $1`,
            [id]
        )
        
        let nota = rows[0]

        if (!nota){
            return res.status(400).json({
                message: "Nota não encontrada"
            })
        }

        req.profile = nota
        next()

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export const read = async (req, res) => {
    const nota = req.profile
    res.json(nota)
}

export const update = async (req, res) => {
    try {
        let nota = req.profile 
        nota = extend(nota, req.body)

        nota.aprovado = isAprovado(nota.valor)

        const { rows } = await pool.query(
            'UPDATE nota SET valor = $1, aprovado = $2, curso_id = $3, aluno_id = $4 WHERE nota_id = $5 RETURNING *;',
            [nota.valor, nota.aprovado, nota.curso_id, nota.aluno_id, nota.nota_id])
        
        const updatedNota = rows[0]
        
        res.status(200).json(updatedNota)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const remove = async (req,res) => {
    try {
        let nota = req.profile
         await pool.query(
            'DELETE FROM nota WHERE nota_id = $1 RETURNING *;',
            [nota.nota_id]
        )

        res.status(200).json({message: 'nota deletada com sucesso', nota: nota})
    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}