import axios from 'axios'

export const fetchCursos = () => axios.get('/api/cursos')

