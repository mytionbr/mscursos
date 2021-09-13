import express from "express";
import { isAuth } from "../controllers/auth.controller.js";
import { create, find, findById, findResponses, saveResponse } from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/")
  .get(isAuth,find)
  .post(isAuth, create)

router
  .route("/respostas")
  .post(isAuth, saveResponse)
  
router
  .route("/:postId/respostas")
  .get(isAuth, findResponses)

 router
  .route("/info/:postId")
  .get(isAuth,findById)

export default router;