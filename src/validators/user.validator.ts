import joi from "joi";

import {EGengers} from "../enums/gender.enum";
import {regexConstant} from "../constants/regexp.constant";
export class UserValidator {
    static firstName = joi.string().min(2).max(50).trim();
    static age = joi.number().min(18).max(150);
    static genders = joi.valid(...Object.values(EGengers)).required();
    static email = joi.string().regex(regexConstant.EMAIL).trim().required();
    static password = joi.string().regex(regexConstant.PASSWORD).trim();

    static create = joi.object({
        name: this.firstName.required(),
        age: this.age.required(),
        genders: this.genders.required(),
        email: this.email.required(),
        password: this.password.required(),
    });

    static update = joi.object({
        name: joi.string().min(2).max(50).trim(),
        age: joi.number().min(18).max(150),
        genders: joi.valid(...Object.values(EGengers)),
    });
}

