import express from "express";
import { isAuth } from "../controllers/auth.controller.js";
import { create, find } from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/")
  .get(isAuth,find)
  .post(isAuth, create)

export default router;