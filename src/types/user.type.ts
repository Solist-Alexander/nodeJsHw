import {Document} from 'mongoose'
import {EGengers} from "../enums/gender.enum";

export interface IUser extends Document{
    name:String
    age:Number
    genders:EGengers
    email:String
    password:String
}