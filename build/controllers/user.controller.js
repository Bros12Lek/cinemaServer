"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionaUser = adicionaUser;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_js_1 = __importDefault(require("../connection.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function adicionaUser(req, res) {
    // const {nome,email,senha} = req.body;
    // if(!nome || !email ||!senha){
    //     res.status(400).json({"message": "Ops, algum dados não foi informado !"});
    //     return;
    // }
    // try{
    //     const hashPassword = await bcrypt.hash(senha,10);
    //     await dbConnection("usuario").insert({email,"senha":hashPassword,"nome": String(nome).toLowerCase()})
    //     res.status(201).json({"message": "Usuário criado com sucesso !"});
    // }
    // catch(err){
    //     res.status(500).json({"message": err});
    // }
    res.status(200).json({ "sla": req.body });
}
async function login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(400).json({ "message": "Ops, algum dado não foi informado !" });
    }
    try {
        const userPassword = await (0, connection_js_1.default)("usuario").select("senha").where({ email }).first();
        if (!userPassword) {
            res.status(400).json({ "message": "Ops, parece que algum dado está errado !" });
            return;
        }
        const comparedPassword = await bcrypt_1.default.compare(senha, userPassword);
        if (!comparedPassword) {
            res.status(401).json({ "message": "Ops, parece que algum dado está errado !" });
            return;
        }
        const webToken = jsonwebtoken_1.default.sign({ email: email }, email, { expiresIn: "24h" });
        res.status(200).json({ "message": "Logado com sucesso !", "auth": true, "token": webToken });
    }
    catch (err) {
        res.status(500).json({ "message": err });
    }
}
