import { Router } from "express";
import api from "../controllers/admin/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getAdmins);
router.get("/:adminId", api.getAdminById);

router.post("/register-admin", api.register);
router.post("/login-admin", api.login);
router.post("/reset-password", api.resetPassword);

router.put("/:adminId", jwtAuth, api.updateAdmin);

router.delete("/:adminId", jwtAuth, api.deleteAdmin);

export default router;
