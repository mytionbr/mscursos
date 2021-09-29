<p align="center">
  <img style="width: 200px" src="https://github.com/mytionbr/images-videos/blob/master/ms%20-%20logo.png" alt="mscursos logo" />
</p>

<div align="center">

  # MSCURSOS

 MScursos é uma plataforma de cursos online focada em pessoas que desejam aprimorar os seus conhecimentos em tecnologias e negócios digitais. A plataforma oferece um Web App onde os professores podem criar e desenvolver cursos e aulas em um formato de CMS, e os alunos podem acessar os conteúdos e participar das comunidades.  
  
  Toda a plataforma foi desenvolvida utilizando a Stack PERN (PostgreSQL, ExpressJs, React Js, NodeJs)
</div>

## Fluxos

A aplicação apresenta dois fluxos principais, o dos professores e dos alunos.

- Os professores podem:
  - Criar, editar, consultar e excluir cursos.
  - Criar, editar, consultar e excluir aulas.
  - Avaliar os alunos dos seus respectivos cursos.
  - Consultar os comentários e avaliações dos alunos dos seus respectivos cursos.
  - Realizar upload de suas aulas no formato de vídeo;
  - Escrever os conteúdos de suas aulas utilizando as linguagens de Markdown e HTML;
  
- Os alunos podem:
  - Escolher entre três opções de planos: Básico, Intermediário e Avançado. 
  - Realizar o cadastro na plataforma;
  - Realizar o pagamento utilizando uma conta do paypal ou um cartão de crédito;
  - Se matricular nos cursos referentes ao plano escolhido;
  - Acessar os conteúdos das aulas referentes aos cursos;
  - Assistir aos vídeos das aulas por stream;
  - Realizar comentários e avaliações dos cursos matriculados;
  - Pesquisar e filtrar por cursos específicos;
  - Acessar e Criar posts no fórum;
  - Responder aos posts no fórum;
  - Marcar uma resposta como solução;
  - Visualizar o perfil dos outros alunos;
  - Consultar e editar os dados do seu próprio perfil;
  
## Features
  
  - O backend é fornecido através de uma aplicação NodeJs;
  - As requisições, respostas e rotas são tratadas por meio do middleware do Express;
  - Os dados são armazenados em um banco de dados relacional PostgresSQL;
  - A conexão com o banco de dados é realizada através de uma biblioteca de cliente PostgresSQL não bloqueante (pg node);
  - Os componente de IU são construídos e exibidos através da biblioteca ReactJs;
  - A estilização dos componentes é realizado utilizando o Formato JSS por meio da biblioteca Material UI;
  - O estado dos componentes do frontend são gerenciados por meio da biblioteca Redux;
  - As autenticações são realizadas utilizando o mecanismo do JWT;
  - Para a segurança da aplicação, somente são armazenados os hashes das senhas dos usuários; 
  
## Setup

### 1. Clone

```
$ git clone https://github.com/mytionbr/mscursos.git
$ cd mscursos

```

### 2. Setup 

- Instale o [postgresSQL](https://www.postgresql.org/) em sua máquina 
- Crie um banco de dados e nomeie-o de `dbmscursos`
- Na pasta do projeto, navegue até o arquivo chamado `script.bd.sql`

  `cd mscursos/server/database/script`

- Copie o script,  cole no terminal do BD e rode o script
- Navegue até a pasta raiz do projeto e crie um arquivo `.env`
- Crie as seguintes variáveis locais e substitua com as suas informações: 

```
LOCAL_HOST:your_host
USER:your_user
DATABASE_PORT:your_database_port
PASSWORD:your_password
PORT:your_port
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PORT:your_port 
DATABASE_URL:your_database_url
```

 - Se o seu banco de dados não dá suporte ou não tem configurado o SSL, então navegue até o arquivo `config.js`

  `cd mscursos/server/config`

E comente a seguinte parte 

`ssl: { rejectUnauthorized: false }`


### 3. Run Server

```
cd scomics
yarn install // or npm install
yarn start // or npm start
# Para desenvolvimento: yarn nodemon // or  npm run nodemon
```

- De modo padrão, o server entrega o frontend de maneira estática, logo se você acessar a porta [http://localhost:5000/](http://localhost:5000/) no seu navegador o frontend já estará funcionando.

### 4. Run Client

- Caso você deseje alterar o frontend, então rode o `client` de maneira separada e acesse a porta [http://localhost:3000/](http://localhost:3000/) no seu navegador.

```
cd scomics
cd client
yarn install // or npm install
yarn start // or npm start
```
-  Para colocar o projeto em produção rode 
```
cd scomics/client
yarn build // or npm build
```

## Screenshots

## Demo

A aplicação está implementada no Heroku. Confira [aqui](https://mscursos.herokuapp.com/)

## Linguagens & ferramentas

- [NodeJs](https://nodejs.org/en/)
- [ReactJs](https://pt-br.reactjs.org/)
- [ExpressJs](https://expressjs.com/pt-br/)
- [PostgresSQL](https://www.postgresql.org/)
- [ReduxJs](https://redux.js.org/)
- [Material UI](https://material-ui.com/)
- [API do Paypal](https://developer.paypal.com/home)
- [react-markdown](https://www.npmjs.com/package/react-markdown)


# Desenvolvedor

<table>
  <tr>
    <td align='center'>
      <a href='https://github.com/mytionbr'><img style="width: 100px" src='https://avatars.githubusercontent.com/u/43896079?v=4' /><br />Matheus Sousa de Jesus</a>
    </td>
  </tr>
</table>





