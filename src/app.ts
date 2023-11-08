import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import {UserValidator} from "./validators/user.validator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/users",
    async (req: Request, res: Response): Promise<Response<IUser[]>> => {
        const users = await User.find();

        return res.json(users);
    },
);

// Endpoint for creating user
app.post("/users", async (req: Request, res: Response): Promise<void> => {
    try {
        const createdUser = await User.create({ ...req.body });
        res.status(201).json(createdUser);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get("/users/:id",async (req: Request, res: Response)  => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

//
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await  User.findById(id)
        if(!user){
            throw new Error("User not found");
        }
        await User.deleteOne({_id:id})

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {error, value} = UserValidator.update.validate(req.body)
        const user = await User.findByIdAndUpdate(id,value,{
            returnDocument: 'after'
        })
        if (!user) {
            throw new Error("User not found");
        }



        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

const PORT = 5001;

app.listen(PORT, async () => {
    await mongoose.connect(configs.DB_URI);
    console.log(`Server has successfully started on PORT ${PORT}`);
});
