import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Express } from "express";
import router from "./routes";

const app:Express = express();
dotenv.config({path : "../.env"})

app.use(cors());
app.use(router);
app.use(express.json());
app.listen(3001, () => console.log(`Servidor rodando na porta ${3001}`));