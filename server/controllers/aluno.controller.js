import pool from '../database/pool.js'
import bcrypt from 'bcrypt'
import extend from 'lodash/extend.js'
import { usuarioResponseSuccess } from '../custom/responses/usuario.response.js'
import { isValidCPF } from '../utils/isValidCPF.js'
import moment from 'moment'

export const register = async (req,res) => {
    
    try{
        
        const { nome, email, senha, telefone, cpf, data_nascimento } = req.body
        let mistakes = []
        let cpfFormatado = cpf.replace( /\D/g , "") 
        
        if(senha.length < 6){
            let senhaError = {error: 'A senha não possui o tamanho mínimo de 6 caracteres!'}
            mistakes.push(senhaError)
        }
        if(cpf.length < 11){
            let cpfSizeError = {error: 'O CPF deve ter 11 caracteres'}
            mistakes.push(cpfSizeError)
        }
        if(isValidCPF(cpfFormatado) === false){
            let cpfInvalidError = {error: 'O CPF é inválido'}
            mistakes.push(cpfInvalidError)
        }
        if(mistakes.length > 0){
            res.status(400).json(mistakes)
        }

        const senhaHash =  bcrypt.hashSync(senha,8)
        const dataCriacao = moment().format("YYYY-MM-DD")
        const dataUpdate = dataCriacao

        const{ rows } = await pool.query(
            'INSERT INTO aluno(nome, email, data_nascimento, senha, telefone, cpf,data_criacao, data_update) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
            [nome, email, data_nascimento, senhaHash, telefone, cpf, dataCriacao, dataUpdate]
        )   

        let createdAluno = rows[0]
        
        usuarioResponseSuccess(res,createdAluno)
        
    } catch (err){
            res.status(400).json({message: err.error})
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
        aluno._id = aluno.aluno_id
        req.profile = aluno
        next()
        } catch (err) {
            return res.status(400).json({
                message: 'Não foi possível recuperar o aluno'
            })
        }
}

export const read =  async (req, res) => {
        const aluno = req.profile
        usuarioResponseSuccess(res,aluno)  
}

export const update = async (req, res) => {
    try {
        let aluno = req.profile
        aluno = extend(aluno, req.body)
       
        aluno.senha = bcrypt.hashSync(aluno.senha,8)

        const { rows } = await pool.query(
            'UPDATE aluno SET nome = $1, email = $2, data_nascimento = $3, senha = $4 WHERE aluno_id = $5 RETURNING *;',
            [aluno.nome, aluno.email, aluno.data_nascimento, aluno.senha, aluno.aluno_id])
        
        let updatedAluno = rows[0]

        usuarioResponseSuccess(res,updatedAluno)

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
        usuarioResponseSuccess(res,aluno)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

