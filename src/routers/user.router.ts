import {Request, Response, Router} from "express"
import {IUser} from "../types/user.type";
import {User} from "../models/User.model";
import {UserValidator} from "../validators/user.validator";

const router = Router()

router.get(
    "",
    async (req: Request, res: Response): Promise<Response<IUser[]>> => {
        const users = await User.find();

        return res.json(users);
    },
);


router.post("", async (req: Request, res: Response): Promise<void> => {
    try {
        const createdUser = await User.create({ ...req.body });
        res.status(201).json(createdUser);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.get(":id",async (req: Request, res: Response)  => {
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
router.delete(":id", async (req: Request, res: Response) => {
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

router.put(":id", async (req, res) => {
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
export const userRouter = router