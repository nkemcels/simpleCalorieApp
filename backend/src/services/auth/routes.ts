import express from "express";
import { NewUserValidatorCheck, LoginValidationCheck } from "./validators";
import { AuthRouteHandler } from "./controller";

const router = express.Router();

router.post("/login", LoginValidationCheck, AuthRouteHandler.authenticateUser);

router.get("/refreshToken", AuthRouteHandler.refreshUserToken);

router.post("/signup", NewUserValidatorCheck, AuthRouteHandler.registerUser);

export default router;
