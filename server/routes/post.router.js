import express from "express";
import { isAuth } from "../controllers/auth.controller.js";
import { create, find, findById, findResponses, markSolution, saveResponse } from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/")
  .get(isAuth,find)
  .post(isAuth, create)

router
  .route("/respostas")
  .post(isAuth, saveResponse)

router
  .route("/solucao")
  .patch(isAuth,markSolution)
  
router
  .route("/:postId/respostas")
  .get(isAuth, findResponses)

 router
  .route("/info/:postId")
  .get(isAuth,findById)

export default router;