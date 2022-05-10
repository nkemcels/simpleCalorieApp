import { body } from "express-validator";
import { validationCheck } from "../../middlewares/validationCheck";

const NewUserValidator = [
    // body("username").isString().isLength({ min: 2 }),
    body("password").isString().isLength({ min: 6 }),
    body("firstName").isString().isLength({ min: 2 }),
    body("lastName").isString().isLength({ min: 2 }),
    body("telephone").isString().isLength({ min: 5 }),
    body("email").isString().isEmail(),
];

export const NewUserValidatorCheck = [...NewUserValidator, validationCheck];

export const LoginValidator = [body("email").isString(), body("password").isString()];
export const LoginValidationCheck = [...LoginValidator, validationCheck];
