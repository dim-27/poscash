import { Router } from "express";
import api from "../controllers/cart/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getCarts);
router.get("/:cartId", api.getCartById);
router.get("/user/:userId", api.getCartByUserId);

router.post("/", api.addCart);

router.post("/item", api.deleteCartItem);
router.post("/increase", api.increaseQuantity);
router.post("/decrease", api.decreaseQuantity);

router.delete("/:cartId", jwtAuth, api.deleteCart);

export default router;
