import express from "express";
const router = express.Router();
import { adicionaUser,login } from "./controllers/user.controller.js";

router
    .post("/register",adicionaUser)
    .post("/login",login)
    .get("/", () => console.log("servidor funcionando!"))

export default router;