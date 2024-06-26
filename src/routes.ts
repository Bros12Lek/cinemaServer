import express from "express";
const router = express.Router();
import { registerUser,login } from "./controllers/user.controller.js";

router
    .post("/register",registerUser)
    .post("/login",login)
    .get("/", () => console.log("servidor funcionando!"))

export default router;