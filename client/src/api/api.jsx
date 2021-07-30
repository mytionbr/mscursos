import axios from 'axios'

const fetchCursos = () => axios.get('/api/cursos')

const fetchCategorias = () => axios.get('/api/categorias')

const findCursos = (query) => axios.get('/api/cursos/' + query)

const Api = {
    fetchCursos,
    fetchCategorias,
    findCursos
}

export default Api
