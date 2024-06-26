import { Request,Response } from "express";
import bcrypt from "bcrypt";
import dbConnection from "../connection.js";
import jwt from "jsonwebtoken";

interface userRegister{
    nome:string,
    email:string,
    senha:string
}

export async function registerUser(req:Request,res:Response){
    const {nome,email,senha}:userRegister = req.body;

    if(!nome || !email ||!senha){
        res.status(400).json({"message": "Ops, algum dados não foi informado !"});
        return;
    }

    // try{
    //     const hashPassword = await bcrypt.hash(senha,10);
    //     await dbConnection('usuarios').insert({email,"senha":hashPassword,"nome": String(nome).toLowerCase()})
    //     res.status(201).json({"message": "Usuário criado com sucesso !"});
    // }
    // catch(err){
    //     res.status(500).json({"message": err});
    //     console.log(err);
    // }
}

export async function login(req:Request,res:Response){
    const {email,senha} = req.body;

    if(!email || !senha){
        res.status(400).json({"message": "Ops, algum dado não foi informado !"});
    }

    try{
        const userPassword = await dbConnection("usuario").select("senha").where({email}).first();
        if(!userPassword){
            res.status(400).json({"message": "Ops, parece que algum dado está errado !"});
            return
        }

        const comparedPassword = await bcrypt.compare(senha,userPassword);
        if(!comparedPassword){
            res.status(401).json({"message": "Ops, parece que algum dado está errado !"});
            return;
        }
        const webToken:any = jwt.sign({email: email},email,{expiresIn: "24h"});
        res.status(200).json({"message":"Logado com sucesso !", "auth": true, "token" : webToken});
    }
    catch(err){
        res.status(500).json({"message": err});
    }
}