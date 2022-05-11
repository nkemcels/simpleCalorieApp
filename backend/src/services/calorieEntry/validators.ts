import { body, query } from "express-validator";
import { validationCheck } from "../../middlewares/validationCheck";
import { validQueryDate } from "../_utils/validationUtils";

const NewCalorieEntryValidator = [body("name").isString().isLength({ min: 1 }), body("calories").isNumeric(), body("type").isString()];
const DateQueryValidator = [validQueryDate("date", "Invalid date")];
const DateRangeQueryValidator = [validQueryDate("start", "Invalid start date"), validQueryDate("end", "Invalid end date")];

export const NewCalorieEntryValidationCheck = [...NewCalorieEntryValidator, validationCheck];
export const DateQueryValidationCheck = [...DateQueryValidator, validationCheck];
export const DateRangeQueryValidationCheck = [...DateRangeQueryValidator, validationCheck];
