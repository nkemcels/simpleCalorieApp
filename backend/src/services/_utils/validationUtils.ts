import { body, param, query } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validParamObjectId = (fieldName: string, errorMsg: string) => {
    return param(fieldName).custom((val) => {
        if (val && isValidObjectId(val)) {
            return true;
        }
        throw errorMsg;
    });
};

export const validBodyObjectId = (fieldName: string, errorMsg: string) => {
    return body(fieldName).custom((val) => {
        if (val && isValidObjectId(val)) {
            return true;
        }
        throw errorMsg;
    });
};

export const validBodyDate = (fieldName: string, errorMsg?: string) => {
    return body(fieldName).custom((val) => {
        if (val && !Number.isNaN(Date.parse(val))) {
            return true;
        }
        throw errorMsg || "Invalid date";
    });
};

export const validQueryDate = (fieldName: string, errorMsg?: string) => {
    return query(fieldName).custom((val) => {
        if (val && !Number.isNaN(Date.parse(val))) {
            return true;
        }
        throw errorMsg || "Invalid date";
    });
};

export const validBodyOneOf = (fieldName: string, values: string[]) => {
    return body(fieldName).custom((val) => {
        if (val && values.includes(val)) {
            return true;
        }
        throw `${fieldName} must be one of ${values.map((t) => JSON.stringify(t)).join(",")}`;
    });
};
