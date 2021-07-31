import extend from 'lodash/extend.js'
import pool from "../database/pool.js"

export const create = async (req,res) => {
    try {
        const {nome, descricao, professor_id, categoria_id} = req.body

        const { rows } = await pool.query(
            'INSERT INTO curso (nome, descricao, professor_id,categoria_id) VALUES ($1, $2, $3, $4)  RETURNING *;',
            [nome, descricao, professor_id,categoria_id])
        
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
            'SELECT curso_id, nome, descricao, professor_id, categoria_id FROM curso')

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
            'UPDATE curso SET nome = $1, descricao = $2, professor_id = $3, categoria_id = $4 WHERE curso_id = $5 RETURNING *;',
            [curso.nome, curso.descricao, curso.professor_id, curso.categoria_id, curso.curso_id]
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
       
        await pool.query(
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

        await pool.query(
             'DELETE FROM curso_aluno WHERE curso_id = $1 AND aluno_id = $2',
             [curso.curso_id, aluno_id]
         )
 
         res.status(200).json({message: 'Aluno desmatriculado com sucesso'})
     
    } catch (err) {
         res.status(400).json({message:err.message})
    }
 }

export const getAulas = async (req,res) => {
    try {
        const curso = req.profile
        
        const { rows } = await pool.query(
            'SELECT * FROM aula WHERE curso_id = $1',
            [curso.curso_id]
        )
     
        const aulas = rows
 
         res.status(200).json(aulas)
    } catch (err) {
        res.status(400).json({message:err.message})
   }
}

export const findCursoByCategoriaId = async (req, res) =>{
    try {
        const categoria_id  = req.params['categoriaId']
        const { rows } = await pool.query(
            'SELECT * FROM curso WHERE categoria_id = $1 ORDER BY nome',
            [categoria_id])
        
        const cursos = rows
        
        if(!cursos){
           return res.status(400).json({message: 'Não há cursos dessa categoria'})
        }
        
        res.status(200).json(cursos)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const find = async (req, res) => {
    try {
               
        class QueryBuild {

            constructor(){
                this.group = [],
                this.nome = [],
                this.limit = 10,
                this.page = 1,
                this.total = 0,
                this.values = [],
                this.order = '',
                this.query = 'SELECT * FROM curso'
                this.condicional = ''
                this.pages = 0
            }

                selectWithOrder(){
                    return `
                        SELECT * FROM CURSO ORDER BY ${this.order} 
                        ${this.pagination()} 
                    `
                }

                withWhere(){
                    this.isCondicional = true
                    this.condicional += ' WHERE '
                }

                count(){
                    if(this.condicional.length > 0){
                        return ` SELECT COUNT(*) FROM CURSO ${this.condicional} `
                    }
                    return 'SELECT COUNT(*) FROM CURSO'
                    
                }

                withNome(){
                    this.condicional += " nome iLIKE '%'||$1||'%' "
                }

                withAnd(){
                    this.condicional += ' AND '
                }

                withCategorias (values) {
                    this.condicional += ` categoria_id IN (${values}) `
                }

                withPagination () {
                    this.condicional += this.pagination()
                }

                 
                pagination (){
                    if(this.page > 1){
                        return `LIMIT ${this.limit} OFFSET ${(this.page - 1) * this.limit };`
                    }
                    else {
                        return `LIMIT ${this.limit} ;`
                    }

                }

                build (){
                        return this.query + this.condicional
                }

                result (result){
                    return {
                        cursos: result,
                        page: Number(this.page),
                        limit: Number(this.limit),
                        totalItems: Number(this.total),
                        totalPages: Math.ceil(Number(this.total / this.limit)),
                        order: this.order
                    }
                }
            }
                

        let queryBuild = new QueryBuild()

        queryBuild.group = req.query.categoria || []
        queryBuild.nome = req.query.nome || []
        queryBuild.limit = req.query.limit || 10
        queryBuild.page = req.query.page || 1
        queryBuild.order = req.query.order || 'nome'
        
        

        if(queryBuild.group.length === 0 && queryBuild.nome.length === 0 ){
            const totalCursos = await pool.query(queryBuild.count())
        
            queryBuild.total = Number(totalCursos.rows[0].count)
            
            const { rows } = await pool.query(
                queryBuild.selectWithOrder())

                const result = queryBuild.result(rows) 
                           
            return  res.status(200).json(result)
        } else {
            queryBuild.withWhere()
        }


        if(queryBuild.nome.length > 0) {
            

            queryBuild.withNome()
            queryBuild.values.push(queryBuild.nome)
        }

        if(queryBuild.group.length != 0) {
            let index = queryBuild.values.length

            if(index > 0){
                queryBuild.withAnd()
            }

            if(typeof queryBuild.group  === "object"){
                let categoriasIndex = queryBuild.group.map(() => `$${index += 1}`).join(',')
                queryBuild.withCategorias(categoriasIndex)
            } else {
                queryBuild.withCategorias(`$${index + 1}`)
            }


            if(typeof queryBuild.group === "string" ){
                queryBuild.values.push(queryBuild.group)
            } else {
                queryBuild.values.push(...queryBuild.group)
            }

        }
        
        const totalCursos = await pool.query(
            queryBuild.count(),
            queryBuild.values
        )
        queryBuild.total = Number(totalCursos.rows[0].count)
        
        queryBuild.withPagination()
    
        
        const { rows } = await pool.query(
            queryBuild.build(),
            queryBuild.values)


        
        const result = queryBuild.result(rows)

        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
