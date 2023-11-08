import {NextFunction,Request,Response} from "express";
import {IUser} from "../types/user.type";
import {User} from "../models/User.model";

class UserController  {
    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IUser[]>>{
        try {
            const users = await User.find()
            return res.json(users)
        } catch (e){
            next(e)
        }
    }
}
export const userController = new UserController()