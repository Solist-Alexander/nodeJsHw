import {model, Schema} from 'mongoose'
import {EGengers} from "../enums/gender.enum";



const userSchema = new Schema({
    name:{
        type: String,
    },
    age:{
        type: Number,
        min:[1, 'min age is 1'],
        max:[199, 'max age is 199']
    },
    genders:{
        type: String,
        enum: EGengers
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true
    }
})
export  const User = model("user", userSchema)