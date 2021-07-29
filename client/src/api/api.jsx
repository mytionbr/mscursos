import axios from 'axios'

export const fetchCursos = () => axios.get('/api/cursos')

export const fetchCategorias = () => axios.get('/api/categorias')

