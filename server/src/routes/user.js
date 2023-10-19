import { Router } from "express";
import api from "../controllers/user/api.js";
import jwtAuth from "../helpers/jwt-auth.js";
import upload from "../helpers/upload-file.js";

const router = Router();

router.get("/", api.getUsers);
router.get("/:userId", api.getUserById);

router.post("/register-cashier", api.register);
router.post("/login-cashier", api.loginCashier);
router.post("/login-admin", api.loginAdmin);
router.post("/reset-password", api.resetPassword);

router.put("/upload-image/:userId", upload, jwtAuth, api.uploadImage);
router.put("/update/:userId", api.updateUser, (req,res) => {
  res.json({id: req.user})
});

router.delete("/:userId", api.deleteUser);

export default router;
