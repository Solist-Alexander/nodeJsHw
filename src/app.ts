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
app.post("/users", async (req: Request, res: Response):  Promise<Response<IUser>> => {
    try {
        const createdUser = await User.create({ ...req.body });
       return  res.status(201).json(createdUser);
    } catch (e) {
       return  res.status(400).json(e.message);
    }
});

app.get("/users/:id",async (req: Request, res: Response):  Promise<Response<IUser>>  => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if (!user) {
            throw new Error("User not found");
        }
       return res.json(user);
    } catch (e) {
       return res.status(404).json(e.message);
    }
});


app.delete("/users/:id", async (req: Request, res: Response): Promise<void>  => {
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

app.put("/users/:id", async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
        const { id } = req.params;

        const { error, value } = UserValidator.update.validate(req.body);

        const user = await  User.findById(id)

        if (!user) {
            return res.status(404).json("User not found");
        }

        const updatedUser = await User.findByIdAndUpdate(id, value, {
            returnDocument: 'after'
        });

        return res.status(201).json(updatedUser);
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

const PORT = 5001;

app.listen(PORT, async () => {
    await mongoose.connect(configs.DB_URI);
    console.log(`Server has successfully started on PORT ${PORT}`);
});
