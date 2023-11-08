import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import {UserValidator} from "./validators/user.validator";
import {userRouter} from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter)



const PORT = 5001;

app.listen(PORT, async () => {
    await mongoose.connect(configs.DB_URI);
    console.log(`Server has successfully started on PORT ${PORT}`);
});
