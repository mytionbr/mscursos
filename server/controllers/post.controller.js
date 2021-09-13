import pool from "../database/pool.js";
import moment from "moment";
import slugify from "slugify";
import marked from "marked";
import createDomPurify from "dompurify";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const dompurify = createDomPurify(new JSDOM().window);

export const find = async (req, res) => {
  try {
    class QueryBuild {
      constructor() {
        this.limit = 10;
        this.page = 1;
        this.total = 0;
        this.values = [];
        this.order = "data_criacao DESC";
        this.query = `SELECT post.*,aluno.nome as aluno_nome, categoria.nome as categoria_nome, curso.nome as curso_nome, (SELECT COUNT(*) FROM RESPOSTA INNER JOIN POST ON POST.POST_ID = RESPOSTA.POST_ID) as total_respostas FROM post inner join aluno on aluno.aluno_id = post.aluno_id left join categoria on categoria.categoria_id = post.categoria_id left join curso on curso.curso_id = post.curso_id `;
        this.condicional = "";
        this.pages = 0;
        this.queryParams = [];
        this.params = {};
        this.condicionals = [];
      }

      selectWithOrder() {
        return `SELECT * FROM POST ORDER BY ${this.order} 
                    ${this.pagination()} `;
      }

      withWhere() {
        this.isCondicional = true;
        this.condicional += " WHERE ";
      }

      count() {
        if (this.isCondicional) {
          return ` SELECT COUNT(*) FROM POST ${this.condicional} `;
        }
        return "SELECT COUNT(*) FROM POST";
      }

      checkIndex(index) {
        if (index > 0) {
          this.withAnd();
        }
      }

      withAnd() {
        this.condicional += " AND ";
      }

      withPagination() {
        return (this.query += this.pagination());
      }

      pagination() {
        if (this.page > 1) {
          return ` LIMIT ${this.limit} OFFSET ${
            (this.page - 1) * this.limit
          }; `;
        } else {
          return ` LIMIT ${this.limit} ;`;
        }
      }

      build() {
        let index = 0;

        const isMyObjectEmpty = !Object.keys(this.params).length;

        if (!isMyObjectEmpty) {
          this.withWhere();
        }

        for (let param in this.params) {
          this.checkIndex(index);
          if (this.params[param] && param !== "opcao") {
            this.values.push(this.params[param]);
          }
          index++;
          switch (param) {
            case "titulo":
              this.condicional += ` titulo iLIKE '%'||$${index}||'%' `;
              break;
            case "curso":
              this.condicional += ` curso_id = $${index}`;
              break;
            case "opcao":
              switch (this.params[param]) {
                case "TODOS":
                  this.condicional += ` solucionado = true OR solucionado = false `;
                  break;
                case "SEM_RESPOSTA":
                  this.condicional += ` solucionado = false `;
                  break;
                case "SOLUCIONADOS":
                  this.condicional += ` solucionado = true `;
                  break;
              }
              break;
            case "categoria":
              this.condicional += ` cateogoria_id = $${index}`;
              break;
            default:
              break;
          }
        }

        let result = this.query + this.condicional;

        return result;
      }

      result(result) {
        return {
          posts: result,
          page: Number(this.page),
          limit: Number(this.limit),
          totalItems: Number(this.total),
          totalPages: Math.ceil(Number(this.total / this.limit)),
          order: this.order,
          params: this.queryParams,
        };
      }
    }

    let queryBuild = new QueryBuild();

    const titulo = req.query.titulo || "";
    const curso = req.query.curso || "";
    const categoria = req.query.categoria || "";
    const opcao = req.query.opcao || "";
    queryBuild.page = req.query.page || 1;
    queryBuild.order = req.query.order || queryBuild.order;
    queryBuild.queryParams = req.query;

    if (titulo) {
      queryBuild.params.titulo = titulo;
    }

    if (curso) {
      queryBuild.params.curso = curso;
    }

    if (categoria) {
      queryBuild.params.categoria = categoria;
    }

    if (opcao) {
      queryBuild.params.opcao = opcao;
    }

    let query = queryBuild.build();
    let count = queryBuild.count();
    let totalPosts;
    let values = queryBuild.values;

    if (queryBuild.values.length > 0) {
      totalPosts = await pool.query(count, values);
    } else {
      totalPosts = await pool.query(count);
    }

    queryBuild.total = Number(totalPosts.rows[0].count);

    query = queryBuild.withPagination();
    const { rows } = await pool.query(query, values);

    let result = queryBuild.result(rows);

    result.posts = result.posts.map((post) => {
      let tags = [];

      if (post.categoria_id) {
        tags.push({
          categoria_id: post.categoria_id,
          nome: post.categoria_nome,
        });
        post.categoria_nome = undefined;
      }

      if (post.curso_id) {
        tags.push({
          curso_id: post.curso_id,
          nome: post.curso_nome,
        });
        post.categoria_nome = undefined;
      }

      post.tags = tags;

      post.aluno = {
        nome: post.aluno_nome,
        aluno_id: post.aluno_id,
      };
      post.aluno_nome = undefined;

      return post;
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { titulo, conteudo, categoria_id, curso_id, aluno_id } = req.body;

    const data_criacao = moment().format("YYYY-MM-DD");
    const data_atualizacao = data_criacao;
    const solucionado = false;
    const slug = slugify(titulo, {
      lower: true,
      strict: true,
    });

    let sanitizedConteudo;

    if (conteudo) {
      sanitizedConteudo = dompurify.sanitize(marked(conteudo));
    }

    const { rows } = await pool.query(
      "INSERT INTO post (titulo, conteudo, slug,solucionado, categoria_id, curso_id, aluno_id, data_criacao, data_atualizacao  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )  RETURNING *;",
      [
        titulo,
        sanitizedConteudo,
        slug,
        solucionado,
        categoria_id,
        curso_id,
        aluno_id,
        data_criacao,
        data_atualizacao,
      ]
    );

    const postCreated = rows[0];

    if (!postCreated) {
      return res.status(400).json({ message: "Erro ao criar o post" });
    }

    res.status(201).json(postCreated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const postId = req.params.postId;

    let result = {};

    const { rows: postRows } = await pool.query(
      `SELECT POST.*, ALUNO.NOME AS ALUNO_NOME, ALUNO.ALUNO_ID AS ALUNO_ID,
      CATEGORIA.CATEGORIA_ID AS CATEGORIA_ID, CATEGORIA.NOME AS CATEGORIA_NOME,
      CURSO.CURSO_ID AS CURSO_ID, CURSO.NOME AS CURSO_NOME
      FROM POST INNER JOIN ALUNO ON ALUNO.ALUNO_ID = POST.ALUNO_ID
      LEFT JOIN CATEGORIA ON CATEGORIA.CATEGORIA_ID = POST.CATEGORIA_ID
      LEFT JOIN CURSO ON CURSO.CURSO_ID = POST.CURSO_ID
      WHERE POST.POST_ID = $1`,
      [postId]
    );

    result.post = postRows[0];
    
    result.post.aluno = {
      nome: result.post.aluno_nome,
      aluno_id: result.post.aluno_id
    }
    res.status(200).json(result);
  } catch (err) {
    console.log('eita', err)
    res.status(400).json({ message: err.message });
  }
};

export const findResponses = async (req,res)=>{
  try{
    console.log('ooijiojiojio')
    const postId = req.params.postId;

    const result = {}

    const { rows } = await pool.query(
      `SELECT RESPOSTA.*, ALUNO.ALUNO_ID AS ALUNO_ID, ALUNO.NOME AS ALUNO_NOME, PROFESSOR.PROFESSOR_ID AS PROFESSOR_ID, PROFESSOR.NOME AS PROFESSOR_NOME FROM RESPOSTA LEFT JOIN ALUNO ON RESPOSTA.ALUNO_ID = ALUNO.ALUNO_ID LEFT JOIN PROFESSOR ON PROFESSOR.PROFESSOR_ID = RESPOSTA.PROFESSOR_ID WHERE RESPOSTA.POST_ID = $1 ORDER BY RESPOSTA.DATA_CRIACAO DESC`,
      [postId]
    );

    result.respostas = rows
    result.total_respostas = rows.length

    result.respostas = result.respostas.map(resposta =>{
      let usuario = {}
      if(resposta.aluno_id){
        usuario.aluno_id = resposta.aluno_id
        usuario.nome = resposta.aluno_nome
      }else if(resposta.professor_id){
        usuario.professor = resposta.professor_id
        usuario.nome = resposta.professor_nome
      }
      resposta.usuario = usuario
      return resposta
    })

    result.solucao_id = result.respostas.filter(resposta=>{
      if(resposta.solucao){
        return resposta.resposta_id
      }
    })

    console.log(result)
    res.status(200).json(result);
  }catch (err){
    console.log('opa', err)
    res.status(400).json({ message: err.message });
  }
}


export const saveResponse = async (req, res) => {
  try {
    console.log('msdofknajofnsjdin')
    const { resposta, post_id ,aluno_id } = req.body;

    const data_criacao = moment().format("YYYY-MM-DD");
    const data_atualizacao = data_criacao;
    const solucao = false
    let sanitizedConteudo;

    if (resposta) {
      sanitizedConteudo = dompurify.sanitize(marked(resposta));
    }

    const { rows } = await pool.query(
      "INSERT INTO resposta (conteudo, post_id, aluno_id, data_criacao, data_atualizacao, solucao  ) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;",
      [
        sanitizedConteudo,
        post_id,
        aluno_id,
        data_criacao,
        data_atualizacao,
        solucao
      ]
    );

    const respostaCreated = rows[0];

    if (!respostaCreated) {
      return res.status(400).json({ message: "Erro ao salvar a resposta" });
    }

    res.status(201).json(respostaCreated);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};