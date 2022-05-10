import express from "express";
import { UserRouteHandler } from "./controller";
import { UserCredentialsValidatorCheck } from "./validators";

const router = express.Router();

router.put("/me/updateAuthCredentials", UserCredentialsValidatorCheck, UserRouteHandler.updateUserCredentials);
router.get("/me/data", UserRouteHandler.getUserData);
router.put("/me/data", UserRouteHandler.updateUserInfo);
router.put("/me/data", UserRouteHandler.updateUserInfo);

export default router;
