import axios from 'axios'

const fetchCursos = () => axios.get('/api/cursos')

const fetchCategorias = () => axios.get('/api/categorias')

const findCursos = (query) => axios.get('/api/cursos/' + query)

const signinAluno = (email, password) => axios.post('/api/auth/aluno/signin', {email: email, senha: password })

const signinProfessor = (email, password) => axios.post('/api/auth/professor/signin', {email: email, senha: password })

const findAssignmentsProfessor = (id,professorInfo) => axios.get(`/api/professores/${id}/atribuicoes`,{
    headers: {Authorization: `Bearer ${professorInfo?.token}`}
})

const findCursosByProfessor = (professorInfo) => axios.get(`/api/cursos/professor/${professorInfo.professor_id}`,{
    headers: {Authorization: `Bearer ${professorInfo?.token}`}
})

const Api = {
    fetchCursos,
    fetchCategorias,
    findCursos,
    signinAluno,
    signinProfessor,
    findAssignmentsProfessor,
    findCursosByProfessor
}

export default Api
