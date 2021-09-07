import express from "express";
import { isAuth } from "../controllers/auth.controller.js";
import { find } from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/find")
  .get(isAuth,find)

export default router;