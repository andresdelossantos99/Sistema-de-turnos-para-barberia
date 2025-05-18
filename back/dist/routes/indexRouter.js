"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
// import auth from "../middelware/auth"
const indexrouter = (0, express_1.Router)();
indexrouter.use("/users", userRouter_1.default);
indexrouter.use("/appointments", appointmentsRouter_1.default);
exports.default = indexrouter;
