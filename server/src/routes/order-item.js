import { Router } from "express";
import api from "../controllers/order-item/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getOrderItems);
router.get("/:order-item", api.getOrderItemById);

router.post("/", api.addOrderItem);

router.delete("/:order-item", jwtAuth, api.deleteOrderItem);

export default router;
