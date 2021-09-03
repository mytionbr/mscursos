import pool from "../database/pool.js";
import extend from "lodash/extend.js";
import moment from "moment";
import slugify from "slugify";
import marked from 'marked'
import createDomPurify from 'dompurify'
import jsdom from 'jsdom'
import fs from 'fs'

const { JSDOM } = jsdom
const dompurify = createDomPurify(new JSDOM().window)

export const create = async (req,res) => {
    try {
        const { nome, descricao,duracao, conteudo, curso_id } = req.body
        let video
        let uploadPath = null
        const slug = slugify(
            nome,
            {
              lower: true,
              strict: true
            }
        )

        let sanitizedConteudo;

        if(conteudo){
            sanitizedConteudo = dompurify.sanitize(marked(conteudo)) 
        }
        if(req.files || Object.keys(req.files).length > 0){
            video = req.files.video
            uploadPath = process.cwd() + '/server/upload/' + video.name
        
            await video.mv(uploadPath, (err)=>{
                if(err){
                    return res.status(400).json({message: 'Erro ao lidar com o video'})
                }
            })
        }

        const { rows } = await pool.query(
            'INSERT INTO aula (nome, descricao,duracao,conteudo,slug, curso_id, video) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *;',
            [nome, descricao,duracao,sanitizedConteudo, slug, curso_id, uploadPath])
        
        const data_atualizacao = moment().format('YYYY-MM-DD')

       await pool.query(
            'UPDATE curso SET data_atualizacao = $1 WHERE curso_id = $2',
            [data_atualizacao,curso_id])
        
        const createdAula = rows[0]

        if (!createdAula) {
            return res.status(400).json({message: 'Erro ao criar a aula'})
        }

        res.status(201).json(createdAula)

    } catch (err) {
        console.log(err)
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

export const findById = async (req, res) => {
    try {
        const aulaId = req.params.aulaId || req.params.id
        const { rows } = await pool.query(
            'SELECT AULA FROM AULA  WHERE AULA.AULA_ID = $1',
            [aulaId])

        const aula = rows[0]
        
        if(!aula){
            return res.status(400).json('Aula não encontrada')
        }
       

        res.status(200).json(aula)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


export const findByIdAndAluno = async (req, res) => {
    try {
        const aulaId = req.params.aulaId || req.params.id
        const alunoId = req.auth._id
        
        const { rows } = await pool.query(
            `SELECT AULA.*,
            (SELECT VISUALIZACAO.VISUALIZACAO_ID FROM VISUALIZACAO 
                INNER JOIN AULA ON AULA.AULA_ID = VISUALIZACAO.AULA_ID 
                INNER JOIN ALUNO ON ALUNO.ALUNO_ID = VISUALIZACAO.ALUNO_ID 
                WHERE ALUNO.ALUNO_ID = $1 AND AULA.AULA_ID = $2 ) AS VISUALIZACAO_ID FROM AULA 
            LEFT JOIN VISUALIZACAO ON VISUALIZACAO.AULA_ID = AULA.AULA_ID 
            WHERE AULA.AULA_ID = $2`,
            [alunoId,aulaId])

        const aula = rows[0]

        if(!aula){
            return res.status(400).json('Aula não encontrada')
        }
       
        aula.video = aula.video ? true : false

        res.status(200).json(aula)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


export const read = async (req, res) => {
    const aula = req.aula
    res.status(200).json(aula)
}

export const update = async (req,res) => {
    try {
        const curso = req.profile
        const aulaId = req.params.aulaId
        
        const { rows: aulasRows } = await pool.query(
            'SELECT * FROM aula WHERE aula_id = $1 AND curso_id = $2',
            [aulaId,curso.curso_id])
       
        let aula = extend(aulasRows[0], req.body)
        
        const { rows } = await pool.query(
            'UPDATE aula SET nome = $1, descricao = $2, curso_id = $3, duracao = $4 WHERE aula_id = $5 RETURNING *;',
            [aula.nome, aula.descricao, aula.curso_id,aula.duracao, aula.aula_id])
        const updatedAula = rows[0]

        res.status(200).json(updatedAula)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const remove = async (req, res) =>{
    try {
        
        const curso = req.profile
        const aulaId = req.params.aulaId

        await pool.query(
            'DELETE FROM aula WHERE curso_id = $1 AND aula_id = $2',
            [curso.curso_id,aulaId]
        )

        res.status(200).json({
            message: 'aula deletada com sucesso'
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const finishAula = async (req,res)=>{
    try{
      
      const alunoId = req.auth._id
      const aula = req.body
      const data_criacao = moment().format('YYYY-MM-DD')

      const { rows } = await pool.query(
        `INSERT INTO VISUALIZACAO (ALUNO_ID, AULA_ID, DATA_CRIACAO, CURSO_ID)
        VALUES($1,$2,$3,$4) RETURNING *;`,
        [alunoId,aula.aula_id,data_criacao,aula.curso_id]
      )
        
      const visualizacao = rows[0]
  
      res.status(201).json(visualizacao)
  
    } catch (err){
      res.status(400).json({ message: err.message });
    }
  }


export const getVideo = async (req,res)=>{
    try{
        const range = req.headers.range
        if (!range){
            res.status(400).send('Requires range header')
        }
        const aula_id = req.params.id
    
        const { rows } = await pool.query(
            `SELECT AULA.VIDEO FROM AULA WHERE AULA.AULA_ID = $1`,
            [aula_id])

        if(!rows[0]){
            return res.status(400).send('Aula não encontrada')
        }

        const videoPath = rows[0].video
    
        const videoSize = fs.statSync(videoPath).size
        const CHUNK_SIZE = 10 ** 6
        const start = Number(range.replace(/\D/g, ""))
        const end =  Math.min(start + CHUNK_SIZE, videoSize - 1 )
        
        const contentLength = end - start + 1
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        res.writeHead(206, headers)

        const videoSteam = fs.createReadStream(videoPath, {start,end})

        videoSteam.pipe(res)
    } catch (err){
        console.log(err)
      res.status(400).json({ message: err.message });
    }
}