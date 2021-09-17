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
            
            res.status(401).json({message:'Email ou senha inválidos'})
        
    } catch (err) {
        return res.status(401).json({
            message: 'Não foi possível realizar o login'
        })
    }
}

export const signinAluno = async (req,res) =>{
    try {

        const { rows } = await pool.query(
            `SELECT ALUNO.aluno_id,ALUNO.nome,ALUNO.email,ALUNO.senha, 
            ASSINATURA.ASSINATURA_ID,ASSINATURA.PAGO, ASSINATURA.PLANO_ID, ASSINATURA.ALUNO_ID AS assinatura_aluno
            FROM aluno LEFT JOIN ASSINATURA ON ASSINATURA.ALUNO_ID = ALUNO.ALUNO_ID  
            WHERE email = $1`,
            [req.body.email])
          
       
       const result = rows[0]
       
        if(result){
            const aluno = {
                nome: result.nome,
                email: result.email,
                senha: result.senha,
                aluno_id: result.aluno_id,
                assinatura: {
                    pago: result.pago,
                    assinatura_id: result.assinatura_id,
                    aluno_id: result.assinatura_aluno,
                    plano_id: result.plano_id
                }
            } 
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

        res.status(401).json({message:'Email ou senha inválidos'})  
    } catch (err){       
        res.status(401).json({
            message: 'Não foi possível realizar o login'
        })
    }
}

export const isAuth = (req, res, next) => {
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
  
   if(!authorized){
        return res.status(403).json({
            message: "Usuário não está autorizado"
        })
    }
   
    next()
}

export const hasAuthorizationMatricula = async (req, res, next) =>{

    const alunoId = req.body.aluno_id || req.params['alunoId']
    const authorized = alunoId && req.auth && Number(alunoId) === req.auth._id
    
    if(!authorized){
         return res.status(403).json({
             message: "Usuário não está autorizado"
         })
     }
    
     next()
 }


 export const hasAuthorizationAula = async (req, res, next) =>{
    try{
    const alunoId = req.auth && req.auth._id
    const aulaId = req.body.aula_id || req.params.id || req.params.aula_id 
 
    const { rows } = await pool.query(
        `SELECT CURSO.CURSO_ID FROM CURSO 
        INNER JOIN AULA ON AULA.CURSO_ID = CURSO.CURSO_ID
        INNER JOIN CATEGORIA ON CATEGORIA.CATEGORIA_ID = CURSO.CATEGORIA_ID
        INNER JOIN ASSINATURA ON ASSINATURA.PLANO_ID >= CATEGORIA.PLANO_ID 
        WHERE AULA.AULA_ID = $1 AND ASSINATURA.ALUNO_ID = $2`,
        [aulaId, alunoId]
    )
            
    const authorized = rows && rows.length > 0
    
    if(!authorized){
         return res.status(403).json({
             message: "Usuário não está autorizado a realizar essa ação"
         })
     }
    
     next()
    }catch(err){
        return res.status(403).json({
            message: err.message
        })
    }
 }