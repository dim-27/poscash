import { Router } from "express";
import api from "../controllers/order/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getOrders);
router.get("/:orderId", api.getOrderById);

router.post("/", api.addOrder);

router.delete("/:orderId", jwtAuth, api.deleteOrder);

export default router;
