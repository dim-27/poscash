import { Router } from "express";
import api from "../controllers/order/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getOrders);
router.get("/item", api.getOrderItems);
router.get("/user/:userId", api.getOrderByUserId);

router.post("/transation", api.transaction);
router.post("/", api.addOrder);
router.post("/item", api.addOrderItem);

router.delete("/:orderId", jwtAuth, api.deleteOrder);

export default router;
