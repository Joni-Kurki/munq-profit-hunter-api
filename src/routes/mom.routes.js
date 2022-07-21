import express from "express";
import { getLandPlots } from "../controllers/mom.controller.js";

const router = express.Router();

router.use("/getLandPlots", getLandPlots);

export default router;