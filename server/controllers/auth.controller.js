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
            
            res.status(401).json({error:'Email ou senha invalidos'})
        
    } catch (err) {
        return res.status(401).json({
            error: 'Não foi possível realizar o login'
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

        res.status(401).json({error:'Email ou senha invalidos'})  
    } catch (err){
        return res.status(401).json({
            error: 'Não foi possível realizar o login'
        })
    }
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    console.log('autenticação')
    if (authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(
            token,
            config.JWT_SECRET,
            (err,decode) =>{
                if (err) {
                    res.status(401).json({message: 'Token invalido'})
                } else {
                    
                    req.auth = decode
                    next()
                }
            }
        )
    } else {
        res.status(401).json({message: 'Sem token'})
    }
}

export const hasAuthorization = (req, res, next) =>{

    const authorized = req.profile && req.auth && req.profile._id === req.auth._id


    if(!authorized){
        return res.status(403).json({
            message: "Usuário não está autorizado"
        })
    }
    next()
}

export const hasAuthorizationCurso = async (req, res, next) =>{

   const authorized = req.profile && req.auth &&  req.profile.professor_id === req.auth._id
   console.log('autorização')
   if(!authorized){
        return res.status(403).json({
            message: "Usuário não está autorizado"
        })
    }
   
    next()
}