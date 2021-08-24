import extend from "lodash/extend.js";
import pool from "../database/pool.js";
import moment from 'moment'
import slugify from 'slugify'
import marked from 'marked'
import createDomPurify from 'dompurify'
import jsdom from 'jsdom'
import { countOccurrences } from "../utils/countOccurrences.js";
import { calculateAverage } from "../utils/calculateAverage.js";

const { JSDOM } = jsdom
const dompurify = createDomPurify(new JSDOM().window)

export const create = async (req, res) => {
  try {
    const { nome, descricao, professor_id, categoria_id, resumo } = req.body;
    const data_criacao = moment().format('YYYY-MM-DD')
    const data_atualizacao = data_criacao

    const slug = slugify(
      nome,
      {
        lower: true,
        strict: true
      }
    )

    let sanitizedResumo;

    if(resumo){
      sanitizedResumo = dompurify.sanitize(marked(resumo)) 
    }

    const { rows } = await pool.query(
      "INSERT INTO curso (nome, descricao, professor_id,categoria_id, data_atualizacao,data_criacao, resumo, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )  RETURNING *;",
      [nome, descricao, professor_id, categoria_id, data_atualizacao,data_criacao, sanitizedResumo, slug]
    );

    const cursoCreated = rows[0];

    if (!cursoCreated) {
      return res.status(400).json({ message: "Erro ao criar o curso" });
    }

    res.status(201).json(cursoCreated);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT curso_id, nome, descricao, professor_id, categoria_id FROM curso"
    );

    const cursosList = rows;

    res.status(200).json(cursosList);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const findById = async (req, res, next, id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM curso WHERE curso_id = $1",
      [id]
    );

    const curso = rows[0];

    if (!curso) {
      return res.status(400).json({ message: "curso não encontrado" });
    }

    req.profile = curso;
    next();
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const read = async (req, res) => {
  const curso = req.profile;
  res.status(200).json(curso);
};

export const update = async (req, res) => {
  try {
    let curso = req.profile;
    curso = extend(curso, req.body);
    const data_atualizacao = moment().format('YYYY-MM-DD')

    const slug = slugify(
      curso.nome,
      {
        lower: true,
        strict: true
      }
    )

    let sanitizedResumo;

    if(curso.resumo){
      sanitizedResumo = dompurify.sanitize(marked(curso.resumo)) 
    }

    const { rows } = await pool.query(
      "UPDATE curso SET nome = $1, descricao = $2, professor_id = $3, categoria_id = $4, slug = $5, resumo = $6, data_atualizacao = $7 WHERE curso_id = $8 RETURNING *;",
      [
        curso.nome,
        curso.descricao,
        curso.professor_id,
        curso.categoria_id,
        slug,
        sanitizedResumo,
        data_atualizacao,
        curso.curso_id,
      ]
    );

    const updatedCurso = rows[0];

    res.status(200).json(updatedCurso);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const curso = req.profile;

    await pool.query("DELETE FROM curso WHERE curso_id = $1 RETURNING *;", [
      curso.curso_id,
    ]);

    res.status(200).json({
      message: "curso deletado com sucesso",
      curso: curso,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const enroll = async (req, res) => {
  try {
    const curso = req.profile;
    const aluno_id = req.body.aluno_id

    const { rows: assinatura } = await pool.query(
      `SELECT ASSINATURA.PAGO, ASSINATURA.PLANO_ID AS assinatura_plano, ASSINATURA.ALUNO_ID
      FROM ASSINATURA WHERE ASSINATURA.ALUNO_ID = $1`,
      [aluno_id])

    if(!assinatura[0] || !assinatura[0].pago){
      return res.status(400).json({message: 'Essa operação não é permitida a esse usuário'})
    }

    const { rows: categoria } = await pool.query(
      `SELECT * FROM CATEGORIA WHERE CATEGORIA_ID = $1`,
      [curso.categoria_id]
    )

    if(categoria[0] && categoria[0].plano_id !== assinatura[0].plano_id){
      return res.status(400).json({message: 'O plano do usuário não cobre esse curso'})
    }

    const { rows } = await pool.query(
      `
            INSERT INTO curso_aluno (curso_id, aluno_id)
            SELECT $1, $2
            WHERE  NOT EXISTS (
               SELECT 1 FROM curso_aluno
               WHERE (curso_id, aluno_id) = ($3, $4)) RETURNING *;
            `,
      [curso.curso_id, aluno_id, curso.curso_id, aluno_id]
    );

    const matricula = rows[0];

    if (!matricula) {
      return res.status(400).json({
        message: "A matricula já existe",
      });
    }

    res.status(200).json({
      message: "matricula realizada com sucesso",
      matricula: matricula,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

export const listMatriculas = async (req, res) => {
  try {
    const curso = req.profile;
    const { rows } = await pool.query(
      "SELECT * FROM curso_aluno WHERE curso_id = $1",
      [curso.curso_id]
    );

    const listMatriculas = rows;

    res.status(200).json(listMatriculas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAluno = async (req, res) => {
  try {
    const curso = req.profile;
    const aluno_id = req.params["alunoId"];

    const { rows } = await pool.query(
      "SELECT * FROM curso_aluno WHERE curso_id = $1 AND aluno_id = $2",
      [curso.curso_id, aluno_id]
    );

    const matricula = rows;

    res.status(200).json(matricula);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const unenroll = async (req, res) => {
  try {
    const curso = req.profile;
    const aluno_id = req.params["alunoId"];

    await pool.query(
      "DELETE FROM curso_aluno WHERE curso_id = $1 AND aluno_id = $2",
      [curso.curso_id, aluno_id]
    );

    res.status(200).json({ message: "Aluno desmatriculado com sucesso" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAulas = async (req, res) => {
  try {
    let values = [];

    const curso = req.profile;
    const nome = req.query.nome || "";

    let query = "SELECT * FROM aula WHERE curso_id = $1";
    values.push(curso.curso_id);

    if (nome) {
      query += " AND nome iLIKE '%'||$2||'%'";
      values.push(nome);
    }
    const { rows } = await pool.query(query, [...values]);

    const aulas = rows;

    res.status(200).json(aulas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findCursoByCategoriaId = async (req, res) => {
  try {
    const categoria_id = req.params["categoriaId"];
    const { rows } = await pool.query(
      "SELECT * FROM curso WHERE categoria_id = $1 ORDER BY nome",
      [categoria_id]
    );

    const cursos = rows;

    if (!cursos) {
      return res.status(400).json({ message: "Não há cursos dessa categoria" });
    }

    res.status(200).json(cursos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const find = async (req, res) => {
  try {
    class QueryBuild {
      constructor() {
        (this.group = []),
          (this.nome = []),
          (this.limit = 10),
          (this.page = 1),
          (this.total = 0),
          (this.values = []),
          (this.order = ""),
          (this.query = "SELECT * FROM curso");
        this.condicional = "";
        this.pages = 0;
        this.params = [];
      }

      selectWithOrder() {
        return `
                        SELECT * FROM CURSO ORDER BY ${this.order} 
                        ${this.pagination()} 
                    `;
      }

      withWhere() {
        this.isCondicional = true;
        this.condicional += " WHERE ";
      }

      count() {
        if (this.condicional.length > 0) {
          return ` SELECT COUNT(*) FROM CURSO ${this.condicional} `;
        }
        return "SELECT COUNT(*) FROM CURSO";
      }

      withNome() {
        this.condicional += " nome iLIKE '%'||$1||'%' ";
      }

      withAnd() {
        this.condicional += " AND ";
      }

      withCategorias(values) {
        this.condicional += ` categoria_id IN (${values}) `;
      }

      withPagination() {
        this.condicional += this.pagination();
      }

      pagination() {
        if (this.page > 1) {
          return `LIMIT ${this.limit} OFFSET ${(this.page - 1) * this.limit};`;
        } else {
          return `LIMIT ${this.limit} ;`;
        }
      }

      build() {
        return this.query + this.condicional;
      }

      result(result) {
        return {
          cursos: result,
          page: Number(this.page),
          limit: Number(this.limit),
          totalItems: Number(this.total),
          totalPages: Math.ceil(Number(this.total / this.limit)),
          order: this.order,
          params: this.params,
        };
      }
    }

    let queryBuild = new QueryBuild();

    queryBuild.group = req.query.categoria || [];
    queryBuild.nome = req.query.nome || [];
    queryBuild.limit = req.query.limit || 10;
    queryBuild.page = req.query.page || 1;
    queryBuild.order = req.query.order || "nome";
    queryBuild.params = req.query;

    if (queryBuild.group.length === 0 && queryBuild.nome.length === 0) {
      const totalCursos = await pool.query(queryBuild.count());

      queryBuild.total = Number(totalCursos.rows[0].count);

      const { rows } = await pool.query(queryBuild.selectWithOrder());

      const result = queryBuild.result(rows);

      return res.status(200).json(result);
    } else {
      queryBuild.withWhere();
    }

    if (queryBuild.nome.length > 0) {
      queryBuild.withNome();
      queryBuild.values.push(queryBuild.nome);
    }

    if (queryBuild.group.length != 0) {
      let index = queryBuild.values.length;

      if (index > 0) {
        queryBuild.withAnd();
      }

      if (typeof queryBuild.group === "object") {
        let categoriasIndex = queryBuild.group
          .map(() => `$${(index += 1)}`)
          .join(",");
        queryBuild.withCategorias(categoriasIndex);
      } else {
        queryBuild.withCategorias(`$${index + 1}`);
      }

      if (typeof queryBuild.group === "string") {
        queryBuild.values.push(queryBuild.group);
      } else {
        queryBuild.values.push(...queryBuild.group);
      }
    }

    const totalCursos = await pool.query(queryBuild.count(), queryBuild.values);
    queryBuild.total = Number(totalCursos.rows[0].count);

    queryBuild.withPagination();

    const { rows } = await pool.query(queryBuild.build(), queryBuild.values);

    const result = queryBuild.result(rows);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findByProfessor = async (req, res) => {
  try {
    const professorId = req.params.professorId;
    const nome = req.query.nome || [];
    const categorias = req.query.categoria || [];

    const values = [professorId];
    let params = "";

    if (nome !== 0 && categorias !== 0) {
      if (nome.length > 0) {
        params += " AND CURSO.NOME iLIKE '%'||$2||'%'";
        values.push(nome);
      }
      if (categorias.length != 0) {
        let index = values.length;

        if (typeof categorias === "object") {
          let categoriasIndex = categorias
            .map(() => `$${(index += 1)}`)
            .join(",");
          params += ` AND CURSO.categoria_id IN (${categoriasIndex}) `;
        } else {
          params += ` AND CURSO.categoria_id IN ($${index + 1}) `;
        }

        if (typeof categorias === "string") {
          values.push(categorias);
        } else {
          values.push(...categorias);
        }
      }
    }

    let query = `SELECT CURSO.*,
        CATEGORIA.NOME AS CATEGORIA_NOME,
        (SELECT COUNT (*) FROM CURSO_ALUNO WHERE CURSO.CURSO_ID = CURSO_ALUNO.CURSO_ID) as alunos, 
        (SELECT COUNT (*) FROM AULA WHERE AULA.CURSO_ID = CURSO.CURSO_ID) as aulas
        FROM CURSO
        INNER JOIN PROFESSOR  ON CURSO.PROFESSOR_ID = PROFESSOR.PROFESSOR_ID
        INNER JOIN CATEGORIA ON CURSO.CATEGORIA_ID = CATEGORIA.CATEGORIA_ID
        WHERE PROFESSOR.PROFESSOR_ID = $1 ${params} GROUP BY CURSO.CURSO_ID, CATEGORIA.CATEGORIA_ID`;

    const { rows } = await pool.query(query, [...values]);

    const cursos = rows;

    res.status(200).json(cursos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findAlunosByCurso = async (req, res) => {
  try {
    const curso = req.profile;

    const nome = req.query.nome || "";
    const email = req.query.email || "";

    let values = [];
    values.push(curso.curso_id);

    let query = "";

    if (nome) {
      query += " AND ALUNO.NOME iLIKE '%'||$2||'%' ";
      values.push(nome);
    }

    if (email) {
      let index = values.length;
      query += ` AND ALUNO.EMAIL iLIKE '%'||$${index + 1}||'%' `;
      values.push(email);
    }

    const { rows } = await pool.query(
      `SELECT ALUNO.ALUNO_ID,ALUNO.NOME, ALUNO.EMAIL,
            NOTA.VALOR as nota, NOTA.NOTA_ID as nota_id FROM ALUNO INNER JOIN CURSO_ALUNO ON CURSO_ALUNO.ALUNO_ID = ALUNO.ALUNO_ID
            INNER JOIN CURSO ON CURSO_ALUNO.CURSO_ID = CURSO.CURSO_ID 
            LEFT JOIN NOTA ON ALUNO.ALUNO_ID = NOTA.ALUNO_ID 
            WHERE CURSO.CURSO_ID = $1 ${query}`,
      [...values]
    );

    const alunos = rows;

    res.status(200).json(alunos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findNotaByCurso = async (req, res) => {
  try {
    const curso = req.profile;
    const notaId = req.params.notaId;

    const { rows } = await pool.query(
      `SELECT NOTA.ALUNO_ID as aluno_id, NOTA.CURSO_ID as curso_id,NOTA.NOTA_ID as nota_id, 
            ALUNO.NOME as aluno_nome, ALUNO.EMAIL as aluno_email, CURSO.NOME as curso_nome,
			NOTA.VALOR as valor, NOTA.APROVADO as aprovado
            FROM ALUNO INNER JOIN NOTA ON NOTA.ALUNO_ID = ALUNO.ALUNO_ID
            INNER JOIN CURSO ON NOTA.CURSO_ID = CURSO.CURSO_ID
            WHERE NOTA.NOTA_ID = $1 AND CURSO.CURSO_ID = $2`,
      [notaId, curso.curso_id]
    );

    const result = rows[0];

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findCursoInfo = async (req, res) => {
  try {
    const slug = req.params.slug;
    
    let cursoInfo = {};

    const cursoResult = await pool.query(
      `
            SELECT CURSO.CURSO_ID AS curso_id,CURSO.NOME AS curso_nome, CURSO.SLUG AS curso_slug,
            CATEGORIA.NOME AS categoria_nome, CURSO.DESCRICAO AS curso_descricao,
            CATEGORIA.CATEGORIA_ID AS categoria_id, CURSO.RESUMO AS curso_resumo,
            CURSO.DATA_ATUALIZACAO AS data_atualizacao,
            PROFESSOR.NOME AS professor_nome,
            PROFESSOR.DESCRICAO AS professor_descricao,
            PROFESSOR.PROFESSOR_ID AS professor_id,
            (SELECT COUNT(*) FROM AULA WHERE CURSO.CURSO_ID = AULA.CURSO_ID) AS aulas_total,
            (SELECT COUNT(AVALIACAO.AVALIACAO_ID) FROM AVALIACAO INNER JOIN AULA ON AULA.CURSO_ID = CURSO.CURSO_ID) AS avaliacao_total,
            (SELECT AVG(AVALIACAO.VALOR) FROM AVALIACAO INNER JOIN AULA ON AULA.CURSO_ID = CURSO.CURSO_ID)
            AS curso_avaliacao
            FROM CURSO 
            INNER JOIN CATEGORIA ON CURSO.CATEGORIA_ID = CATEGORIA.CATEGORIA_ID
            INNER JOIN PROFESSOR ON CURSO.PROFESSOR_ID = PROFESSOR.PROFESSOR_ID
            WHERE CURSO.SLUG = $1;
            `,
      [slug]
    );
    
    if (!cursoResult.rows[0]) {
      return res.status(400).json({ message: "curso não existe" });
    }

    cursoInfo.curso = cursoResult.rows[0];

    const aulasResult = await pool.query(
      `
            SELECT AULA.NOME, AULA.DESCRICAO, AULA.DESCRICAO FROM AULA 
            INNER JOIN CURSO ON AULA.CURSO_ID = CURSO.CURSO_ID 
            WHERE CURSO.SLUG = $1;
            `,
      [slug]
    );

    cursoInfo.aulas = aulasResult.rows;

    const avaliacaoResult = await pool.query(
      `
            SELECT ALUNO.NOME as aluno_nome, AVALIACAO.* FROM AVALIACAO 
            INNER JOIN ALUNO ON ALUNO.ALUNO_ID = AVALIACAO.ALUNO_ID
            INNER JOIN CURSO ON CURSO.CURSO_ID = AVALIACAO.CURSO_ID
            WHERE CURSO.SLUG = $1;
            `,
      [slug]
    );

    cursoInfo.avaliacoes = avaliacaoResult.rows;
    
    
    let starList = cursoInfo.avaliacoes.map(avaliacao =>{
      return avaliacao.valor
    })

    
    let starsOccurrences = countOccurrences(starList)
    
    let starsPercent = calculateAverage(starsOccurrences,Number(cursoInfo.curso.avaliacao_total))

    cursoInfo.stars = starsPercent 

    res.status(200).json(cursoInfo)

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const addRating = async (req,res)=>{
  try{
      const curso = req.profile;
      const {aluno_id,valor, comentario } = req.body

      const data_criacao = moment().format('YYYY-MM-DD')

      const {rows: matricula} = await pool.query(
        `SELECT * FROM CURSO_ALUNO WHERE ALUNO_ID = $1 AND CURSO_ID = $2`,
        [aluno_id, curso.curso_id]
      )

      if(!matricula || matricula.length === 0){
        return res.status(400).json({message:'Essa operação não é permitida a esse usuário'})
      }

      const { rows } = await pool.query(
        'INSERT INTO avaliacao (valor, comentario, data_criacao, aluno_id, curso_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
        [valor, comentario, data_criacao, aluno_id, curso.curso_id]
      )
      
      res.status(201).json(rows)

  } catch(err){
      res.status(400).json({
          message: err.message
      })
  }
}


