import express from "express";
import { checkUserAuth } from "../middlewares/authCheck";
import authRoutes from "./auth/routes";
import userRoutes from "./user/routes";
import calorieEntryRoutes from "./calorieEntry/routes";

// Register models
import "../models/db/index";

// Register routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", checkUserAuth, userRoutes);
router.use("/calorieEntries", checkUserAuth, calorieEntryRoutes);

export default router;
