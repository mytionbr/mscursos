import axios from "axios";

const fetchCursos = () => axios.get("/api/cursos");

const fetchCategorias = () => axios.get("/api/categorias");

const findCursos = (query) => axios.get("/api/cursos/" + query);

const findAulas = (cursoId, query) =>
  axios.get(`/api/cursos/${cursoId}/aulas${query}`);

const findAlunosByCurso = (cursoId, query, professorInfo) =>
  axios.get(`/api/cursos/${cursoId}/alunos/${query}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const signinAluno = (email, password) =>
  axios.post("/api/auth/aluno/signin", { email: email, senha: password });

const signinProfessor = (email, password) =>
  axios.post("/api/auth/professor/signin", { email: email, senha: password });

const findAssignmentsProfessor = (id, professorInfo) =>
  axios.get(`/api/professores/${id}/atribuicoes`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findCursosByProfessor = (professorInfo, query) =>
  axios.get(`/api/cursos/professor/${professorInfo.professor_id}${query}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findCursoById = (cursoId) => axios.get(`/api/cursos/${cursoId}`);

const findMatricula = (alunoId,cursoId) => axios.get(`/api/cursos/${cursoId}/matriculas/${alunoId}`);

const findAulaById = (aulaId, cursoId, professorInfo) =>
  axios.get(`/api/cursos/${cursoId}/aulas/${aulaId}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findAlunosById = (alunoId, professorInfo) =>
  axios.get(`/api/alunos/${alunoId}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findNotaById = (nota, professorInfo) =>
  axios.get(`/api/notas/${nota}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findNotaByIdAndCurso = (nota, curso, professorInfo) =>
  axios.get(`/api/cursos/${curso}/notas/${nota}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const createCurso = (curso, professorInfo) =>
  axios.post(`/api/cursos`, curso, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const createAula = (aula, professorInfo) =>
  axios.post(`/api/cursos/${aula.curso_id}/aulas`, aula, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const createNota = (nota, curso, aluno, professorInfo) =>
  axios.post(
    `/api/cursos/${curso}/alunos/${aluno}/notas`,
    { nota: nota },
    {
      headers: { Authorization: `Bearer ${professorInfo?.token}` },
    }
  );

const createMatricula = (matricula,alunoInfo)=>
  axios.post(
  `/api/cursos/${matricula.curso_id}/matriculas`,
  matricula,
  {
    headers: { Authorization: `Bearer ${alunoInfo?.token}` },
  }
);

const deleteMatricula = (matricula,alunoInfo)=>
  axios.delete(
  `/api/cursos/${matricula.curso_id}/matriculas/${matricula.aluno_id}`,
  {
    headers: { Authorization: `Bearer ${alunoInfo?.token}` },
  }
);


const updateCurso = (curso, professorInfo) =>
  axios.put(`/api/cursos/${curso.curso_id}`, curso, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const updateAula = (aula, professorInfo) =>
  axios.put(`/api/cursos/${aula.curso_id}/aulas/${aula.aula_id}`, aula, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const updateNota = (nota, professorInfo) =>
  axios.put(`/api/notas/${nota.nota_id}/`, nota, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const deleteCurso = (cursoId, professorInfo) =>
  axios.delete(`/api/cursos/${cursoId}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const deleteAula = (aulaId, cursoId, professorInfo) =>
  axios.delete(`/api/cursos/${cursoId}/aulas/${aulaId}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const deleteNota = (notaId, professorInfo) =>
  axios.delete(`/api/notas/${notaId}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const detailsProfessor = (professorInfo) =>
  axios.get(`/api/professores/${professorInfo.professor_id}`, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const findCursosByAluno = (alunoInfo)=>
  axios.get(`/api/cursos/aluno/${alunoInfo.aluno_id}`,
  {
    headers: { Authorization: `Bearer ${alunoInfo?.token}` },
  });

const updateProfessorProfile = (professor, professorInfo) =>
  axios.put(`/api/professores/${professorInfo.professor_id}`, professor, {
    headers: { Authorization: `Bearer ${professorInfo?.token}` },
  });

const createAssinatura = (price, planoId,paymentResult, alunoInfo) =>
  axios.post(`/api/assinaturas/`,
  {
    price,
    planoId,
    paymentResult,
    alunoId: alunoInfo.aluno_id
  }, {
    headers: { Authorization: `Bearer ${alunoInfo?.token}` },
  })

const findAulasInfoByCurso = (cursoSlug,alunoInfo) => 
  axios.get(`/api/curso/aulas/${cursoSlug}`, {
    headers: { Authorization: `Bearer ${alunoInfo?.token}` },
  })

const findAulaInfoById = (aulaId,alunoInfo) => 
axios.get(`/api/aulas/${aulaId}`, {
  headers: { Authorization: `Bearer ${alunoInfo?.token}` },
})


const registerAluno = (aluno) => axios.post(`/api/alunos`, aluno);

const findCursoBySlug = (slug) => axios.get(`/api/cursos/info/${slug}`)

const Api = {
  fetchCursos,
  fetchCategorias,
  findCursos,
  signinAluno,
  signinProfessor,
  findAssignmentsProfessor,
  findCursosByProfessor,
  createCurso,
  findCursoById,
  updateCurso,
  deleteCurso,
  findAulas,
  deleteAula,
  createAula,
  findAulaById,
  updateAula,
  findAlunosByCurso,
  createNota,
  findNotaById,
  findAlunosById,
  updateNota,
  deleteNota,
  findNotaByIdAndCurso,
  detailsProfessor,
  updateProfessorProfile,
  registerAluno,
  createAssinatura,
  findCursoBySlug,
  findMatricula,
  createMatricula,
  deleteMatricula,
  findCursosByAluno,
  findAulasInfoByCurso,
  findAulaInfoById
};

export default Api;
