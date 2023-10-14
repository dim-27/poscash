import { Router } from "express";
import api from "../controllers/init/api.js";

const router = Router();

router.post("/", api);

export default router;
