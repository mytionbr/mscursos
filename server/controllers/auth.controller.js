import pool from "../database/pool.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";
import { usuarioResponseSuccess } from "../custom/responses/usuario.response.js";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

export const signinProfessor = async (req, res) =>{
    try {
        let {rows} = await pool.query(
            'SELECT * FROM professor WHERE email = $1',
            [req.body.email])
        let professor = rows[0]
        
            if (professor){   
                if (bcrypt.compareSync(req.body.senha, professor.senha)){
                   
                    professor.token = generateToken({
                        _id: professor.professor_id,
                        nome: professor.nome,
                        email: professor.email
                    })
                    usuarioResponseSuccess(res,professor)
                    return
                }
            }   
            
            res.status(401).json({message:'Email ou senha invalidos'})
        
    } catch (err) {
        return res.status(401).json({
            message: 'Não foi possível realizar o login'
        })
    }
}

export const signinAluno = async (req,res) =>{
    try {

        const { rows } = await pool.query(
            'SELECT * FROM aluno WHERE email = $1',
            [req.body.email])
        
       
        const aluno = rows[0]
       
        if(aluno){
            if (bcrypt.compareSync(req.body.senha, aluno.senha)){
                aluno.token = generateToken({
                    _id: aluno.aluno_id,
                    nome: aluno.nome,
                    email: aluno.email
                })

                usuarioResponseSuccess(res,aluno)
                return
            }
        }

        res.status(401).json({message:'Email ou senha invalidos'})  
    } catch (err){
        return res.status(401).json({
            message: 'Não foi possível realizar o login'
        })
    }
}

export const isAuthProfessor = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(
            token,
            config.JWT_SECRET,
            (err,decode) =>{
                if (err) {
                    res.status(401).json({message: 'Token invalido'})
                } else {
                    req.user = decode
                    next()
                }
            }

        )
    } else {
        res.status(401).json({message: 'Sem token'})
    }
}