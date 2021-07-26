import pool from "../database/pool.js";
import extend from "lodash/extend.js";

export const create = async (req,res) => {
    try {
        const { nome, descricao, curso_id } = req.body

        const { rows } = await pool.query(
            'INSERT INTO aula (nome, descricao, curso_id) VALUES ($1, $2, $3) RETURNING *;',
            [nome, descricao, curso_id])
        
        const createdAula = rows[0]

        if (!createdAula) {
            return res.status(400).json({message: 'Erro ao criar a aula'})
        }

        res.status(201).json(createdAula)

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

export const list = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM aula',
            )
        
        const listAulas = rows

        res.status(200).json(listAulas)
        
    } catch (err) {
        res.status(501).json({message: err.message})
    }
}

export const findById = async (req, res, next, id) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM aula WHERE aula_id = $1',
            [id])

        const aula = rows[0]
        
        if(!aula){
            return res.status(400).json('Aula não encontrada')
        }

        req.profile = aula
        next()
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const read = async (req, res) => {
    const aula = req.profile
    res.status(200).json(aula)
}

export const update = async (req,res) => {
    try {
        let aula = req.profile
        aula = extend(aula, req.body)

        const { rows } = await pool.query(
            'UPDATE aula SET nome = $1, descricao = $2, curso_id = $3 WHERE aula_id = $4 RETURNING *;',
            [aula.nome, aula.descricao, aula.curso_id, aula.aula_id])
        
        const updatedAula = rows[0]

        res.status(200).json(updatedAula)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const remove = async (req, res) => {
    try {
        let aula = req.profile

        const { rows } = pool.query(
            'DELETE FROM aula WHERE aula_id = $1 RETURNING *;',
            [aula.aula_id])

        res.status(200).json({
            message: 'Aula deletada com sucesso',
            aula: aula
        })

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}