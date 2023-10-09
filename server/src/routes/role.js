import { Router } from "express";
import api from "../controllers/role/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getRoles);
router.get("/:roleId", api.getRoleById);

router.post("/", api.addRole);

router.delete("/:roleId", jwtAuth, api.deleteRole);

export default router;
