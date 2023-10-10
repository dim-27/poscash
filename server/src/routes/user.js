import { Router } from "express";
import api from "../controllers/user/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getUsers);
router.get("/:userId", api.getUserById);

router.post("/register-cashier", api.register);
router.post("/login-cashier", api.login);
router.post("/reset-password", api.resetPassword);

router.put("/:userId", jwtAuth, api.updateUser);

router.delete("/:userId", jwtAuth, api.deleteUser);

export default router;
