import pool from '../database/pool.js'


export const find = async (req,res)=>{
    try {
        class QueryBuild {
            constructor() {
                (this.categoria = ""),
                (this.curso = ""),
                (this.opcao = ""),
                (this.nome = ""),
                (this.limit = 10),
                (this.page = 1),
                (this.total = 0),
                (this.values = []),
                (this.order = ""),
                (this.query = "SELECT * FROM post");
              this.condicional = "";
              this.pages = 0;
              this.params = [];
              this.condicionals = []
            }
      
            selectWithOrder() {
              return `
                    SELECT * FROM POST ORDER BY ${this.order} 
                    ${this.pagination()} `;
            }
      
            withWhere() {
              this.isCondicional = true;
              this.condicional += " WHERE ";
            }
      
            count() {
              if (this.condicional.length > 0) {
                return ` SELECT COUNT(*) FROM POST ${this.condicional} `;
              }
              return "SELECT COUNT(*) FROM POST";
            }
      
            withTitulo() {
              this.checkIndex()
              this.condicional += ` titulo iLIKE '%'||$${this.values.length}||'%' `;
            }

            withCurso() {
                this.checkIndex()
                this.condicional += ` curso_id = $${this.values.length} `;
            }

            withCategoria() {
                this.checkIndex()
                this.condicional += ` categoria_id = $${this.values.length} `;
            }
            
            checkIndex(){
                if(this.values.length > 0){
                    this.withAnd()
                }
            }

            withSemResposta() {
              this.checkIndex()
              this.condicional += " respondido = false ";
            }

            withSolucionados() {
                this.checkIndex()
                this.condicional += " respondido = true ";
              }

            withAnd() {
                this.condicional += " AND ";
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
                posts: result,
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

        queryBuild.titulo = req.body.titulo || ''
        queryBuild.categoria = req.body.categoria || ''
        queryBuild.curso = req.body.curso || ''
        queryBuild.opcao = req.body.opcao || ''
        queryBuild.page = req.body.page || ''

        if(!queryBuild.titulo && !queryBuild.categoria && !queryBuild.curso && !queryBuild.opcao ){
            const totalPosts = await pool.query(queryBuild.count());
            queryBuild.total = Number(totalPosts.rows[0].count);
            
            const { rows } = await pool.query(queryBuild.selectWithOrder());
            const result = queryBuild.result(rows);
            return res.status(200).json(result);
        } else {
            queryBuild.withWhere();
        }
        
        if (queryBuild.titulo) {
            queryBuild.values.push(queryBuild.nome);
            queryBuild.withTitulo();
        }

        if(queryBuild.curso){
            queryBuild.values.push(queryBuild.titulo);
            queryBuild.withCurso();
        }

        if(queryBuild.categoria){
            queryBuild.values.push(queryBuild.categoria);
            queryBuild.withCategoria();
        }

        if(queryBuild.opcao){
            queryBuild.values.push(queryBuild.opcao);

            switch(queryBuild.opcao){
                case 'TODOS':
                break
                case 'SEM_RESPOSTA':
                    queryBuild.withSemResposta()
                break
                case 'SOLUCIONADOS':
                    queryBuild.withSolucionados()
                break
                default:
                    break
            }
        }

        const totalPosts = await pool.query(queryBuild.count());
        queryBuild.total = Number(totalPosts.rows[0].count);
        
        queryBuild.withPagination();

        const { rows } = await pool.query(queryBuild.build(), queryBuild.values);

        const result = queryBuild.result(rows);

        res.status(200).json(result);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}