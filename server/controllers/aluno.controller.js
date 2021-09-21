import pool from '../database/pool.js'
import bcrypt from 'bcrypt'
import extend from 'lodash/extend.js'
import { isValidCPF } from '../utils/isValidCPF.js'
import moment from 'moment'
import { generateToken } from '../utils/generateToken.js'
import { alunoResponseSuccess } from '../custom/responses/aluno.response.js'
import { usuarioResponseSuccess } from '../custom/responses/usuario.response.js'

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
            'INSERT INTO aluno(nome, email, data_nascimento, senha, telefone, cpf,data_criacao, data_update) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING aluno_id,nome, email;',
            [nome, email, data_nascimento, senhaHash, telefone, cpfFormatado, dataCriacao, dataUpdate]
        )   

        let createdAluno = rows[0]

        createdAluno.token = generateToken({
            _id: createdAluno.aluno_id,
            nome: createdAluno.nome,
            email: createdAluno.email
        })

        alunoResponseSuccess(res,createdAluno)
        
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
        const senha = aluno.senha
        aluno = extend(aluno, req.body)

        if(req.body.senha && req.body.senha !== ''){
            aluno.senha = bcrypt.hashSync(req.body.senha,8)
        } else {
            aluno.senha = senha
        }

        const { rows } = await pool.query(
            'UPDATE aluno SET nome = $1, email = $2, data_nascimento = $3, senha = $4 WHERE aluno_id = $5 RETURNING *;',
            [aluno.nome, aluno.email, aluno.data_nascimento, aluno.senha, aluno.aluno_id])
        
            
        let updatedAluno = rows[0]

        updatedAluno.token = generateToken({
            _id: updatedAluno.aluno_id,
            nome: updatedAluno.nome,
            email: updatedAluno.email
        })

        updatedAluno.cpf = undefined
        updatedAluno.telefone = undefined
        updatedAluno.data_nascimento = undefined
        updatedAluno.data_criacao = undefined
        updatedAluno.data_update = undefined

        alunoResponseSuccess(res,updatedAluno)
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
        alunoResponseSuccess(res,aluno)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

export const findDetails = async (req,res)=>{
    try{
        let alunoId = req.params.alunoId

        let result = {}

        const { rows: alunoRows } = await pool.query(
            `SELECT ALUNO.NOME, ALUNO.ALUNO_ID FROM ALUNO WHERE ALUNO.ALUNO_ID = $1`,
            [alunoId])
        
        result.aluno = alunoRows[0]

        const { rows: matriculasRows } = await pool.query(
            `SELECT CURSO.CURSO_ID,CURSO.NOME, CURSO.CATEGORIA_ID, CURSO.SLUG, 
            (SELECT COUNT(VISUALIZACAO.VISUALIZACAO_ID) FROM VISUALIZACAO 
               WHERE VISUALIZACAO.CURSO_ID = CURSO.CURSO_ID AND ALUNO.ALUNO_ID = VISUALIZACAO.ALUNO_ID)
              as aulas_vistas,
            (SELECT COUNT(AULA.AULA_ID) FROM AULA WHERE AULA.CURSO_ID = CURSO.CURSO_ID) as aulas_total
            FROM CURSO INNER JOIN MATRICULA ON CURSO.CURSO_ID = MATRICULA.CURSO_ID
                  INNER JOIN ALUNO ON MATRICULA.ALUNO_ID = ALUNO.ALUNO_ID WHERE ALUNO.ALUNO_ID = $1
                  ORDER BY MATRICULA.DATA_CRIACAO DESC`,
            [alunoId])
        
        let matriculas = matriculasRows

        let cursos_completos = [] 
        matriculas.forEach(item =>{
            const result = (Number(item.aulas_vistas) * 100) / Number(item.aulas_total)
            if(result === 100){
                cursos_completos.push(item)
            }
          })
        
        result.aluno.total_cursos = cursos_completos.length
        
        result.cursos_completos = cursos_completos

        const { rows: postRows } = await pool.query(
            `SELECT COUNT(*) FROM POST WHERE POST.ALUNO_ID = $1`,
            [alunoId])
        
        result.aluno.total_posts = postRows[0].count
        
        res.status(200).json(result)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


export const findInformations = async (req,res)=>{
    try {
        const aluno = req.profile

        const { rows: rowsAssinatura } = await pool.query(
            `SELECT ASSINATURA.ASSINATURA_ID, ASSINATURA.PAGO AS STATUS, ASSINATURA.DATA_CRIACAO AS DATA_INICIO, ASSINATURA.PLANO_ID, PLANO.NOME AS PLANO_NOME,
            ASSINATURA.PRECO, ASSINATURA.ALUNO_ID FROM ASSINATURA INNER JOIN PLANO ON ASSINATURA.PLANO_ID = PLANO.PLANO_ID WHERE ASSINATURA.ALUNO_ID = $1`,
            [aluno.aluno_id])
        
        const assinatura = rowsAssinatura[0]

        aluno.senha = undefined
        aluno.data_update = undefined
        
        let result = {
            aluno,
            assinatura
        }

        res.status(200).json(result)
        
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}