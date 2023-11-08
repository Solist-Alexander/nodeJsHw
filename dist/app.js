"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const User_model_1 = require("./models/User.model");
const user_validator_1 = require("./validators/user.validator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (req, res) => {
    const users = await User_model_1.User.find();
    return res.json(users);
});
app.post("/users", async (req, res) => {
    try {
        const createdUser = await User_model_1.User.create({ ...req.body });
        res.status(201).json(createdUser);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_model_1.User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_model_1.User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        await User_model_1.User.deleteOne({ _id: id });
        res.sendStatus(204);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
});
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = user_validator_1.UserValidator.update.validate(req.body);
        const user = await User_model_1.User.findByIdAndUpdate(id, value, {
            returnDocument: 'after'
        });
        if (!user) {
            throw new Error("User not found");
        }
        res.status(201).json(user);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
});
const PORT = 5001;
app.listen(PORT, async () => {
    await mongoose.connect(config_1.configs.DB_URI);
    console.log(`Server has successfully started on PORT ${PORT}`);
});
