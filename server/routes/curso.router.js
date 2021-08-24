import express from "express";
import {
  hasAuthorizationCurso,
  isAuth,
} from "../controllers/auth.controller.js";
import {
  create,
  enroll,
  findById,
  findCursoByCategoriaId,
  find,
  getAluno,
  getAulas,
  listMatriculas,
  read,
  remove,
  unenroll,
  update,
  findByProfessor,
  findAlunosByCurso,
  findNotaByCurso,
  findCursoInfo,
  addRating
} from "../controllers/curso.controller.js";
import {
  remove as removeAula,
  create as createAula,
  findById as findAulaById,
  update as updateAula,
} from "../controllers/aula.controller.js";

import { create as createNota } from '../controllers/nota.controller.js'

const router = express.Router();

router.route("/").post(create).get(find);

router.route("/professor/:professorId").get(findByProfessor);

router.route("/categorias/:categoriaId").get(findCursoByCategoriaId);

router
  .route("/info/:slug")
  .get(findCursoInfo)
  


router
  .route("/:id")
  .get(read)
  .put(isAuth, hasAuthorizationCurso, update)
  .delete(isAuth, hasAuthorizationCurso, remove);

router.route("/:id/matriculas/")
  .get(listMatriculas)
  .post(enroll)

router.route("/:id/avaliacoes")
  .post(addRating)

router
  .route("/:id/matriculas/:alunoId")
  .get(getAluno)
  .delete(unenroll);

router
  .route("/:id/aulas")
  .get(getAulas)
  .post(isAuth, hasAuthorizationCurso, createAula);

router
  .route("/:id/aulas/:aulaId")
  .get(isAuth, hasAuthorizationCurso, findAulaById)
  .delete(isAuth, hasAuthorizationCurso, removeAula)
  .put(isAuth, hasAuthorizationCurso, updateAula);

router
  .route("/:id/alunos/:alunoId/notas")
  .post(isAuth, hasAuthorizationCurso, createNota)

router
  .route("/:id/alunos")
  .get(isAuth, hasAuthorizationCurso, findAlunosByCurso);
  
router
  .route("/:id/notas/:notaId")
  .get(isAuth, hasAuthorizationCurso, findNotaByCurso)


router.param("id", findById);

export default router;
