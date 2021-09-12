import express from "express";
import { isAuth } from "../controllers/auth.controller.js";
import { create, find, findById } from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/")
  .get(isAuth,find)
  .post(isAuth, create)

router
  .route("/info/:postId")
  .get(isAuth,findById)

export default router;