import { Router } from "express";
import api from "../controllers/cart/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getCarts);
router.get("/:cartId", api.getCartById);
router.get("/user/:userId", api.getCartByUserId);

router.post("/", api.addCart);

router.put("/item", api.deleteCartItem);
router.put("/increase", api.increaseQuantity);
router.put("/decrease", api.decreaseQuantity);

router.delete("/:cartId", jwtAuth, api.deleteCart);

export default router;
