import express from "express";
import { CalorieEntryRouteHandler } from "./controller";
import { DateQueryValidationCheck, DateRangeQueryValidationCheck, NewCalorieEntryValidationCheck } from "./validators";

const router = express.Router();

router.post("/new", NewCalorieEntryValidationCheck, CalorieEntryRouteHandler.addNewEntry);
router.get("/queryDate", DateQueryValidationCheck, CalorieEntryRouteHandler.getEntriesByDate);
router.get("/queryRange", DateRangeQueryValidationCheck, CalorieEntryRouteHandler.getEntriesByDateRange);
router.put("/:entryId", CalorieEntryRouteHandler.updateEntry);
router.delete("/:entryId", CalorieEntryRouteHandler.deleteEntry);

export default router;
