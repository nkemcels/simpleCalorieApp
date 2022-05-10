import { body } from "express-validator";
import { validationCheck } from "../../middlewares/validationCheck";

const NewUserValidator = [
    body("password").isString().isLength({ min: 6 }),
    body("names").isString().isLength({ min: 2 }),
    body("email").isString().isEmail(),
];

export const NewUserValidatorCheck = [...NewUserValidator, validationCheck];

export const LoginValidator = [body("email").isString(), body("password").isString()];
export const LoginValidationCheck = [...LoginValidator, validationCheck];
