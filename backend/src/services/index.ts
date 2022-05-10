import express from "express";
import { checkUserAuth } from "../middlewares/authCheck";
import authRoutes from "./auth/routes";
import userRoutes from "./user/routes";

// Register models
import "../models/db/index";

// Register routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", checkUserAuth, userRoutes);

export default router;
