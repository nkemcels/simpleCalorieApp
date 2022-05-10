import { body, query } from "express-validator";
import { validationCheck } from "../../middlewares/validationCheck";

const UserCredentialsValidator = [body("email").isEmail(), body("password").isLength({ min: 6, max: 20 })];

export const UserCredentialsValidatorCheck = [...UserCredentialsValidator, validationCheck];
