import axios from 'axios'

const fetchCursos = () => axios.get('/api/cursos')

const fetchCategorias = () => axios.get('/api/categorias')

const findCursos = (query) => axios.get('/api/cursos/' + query)

const signinAluno = (email, password) => axios.post('/api/auth/aluno/signin', {email: email, senha: password })

const Api = {
    fetchCursos,
    fetchCategorias,
    findCursos,
    signinAluno
}

export default Api
