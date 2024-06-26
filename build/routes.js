"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_js_1 = require("./controllers/user.controller.js");
router
    .post("/register", user_controller_js_1.adicionaUser)
    .post("/login", user_controller_js_1.login)
    .get("/", () => console.log("servidor funcionando!"));
exports.default = router;
