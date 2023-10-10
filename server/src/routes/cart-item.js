import { Router } from "express";
import api from "../controllers/cart-item/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getCartItems);
router.get("/:cart-item", api.getCartItemById);

router.post("/", api.addCartItem);

router.delete("/:cart-item", jwtAuth, api.deleteCartItem);

export default router;
