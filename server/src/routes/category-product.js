import { Router } from "express";
import api from "../controllers/category-product/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getCategoryProducts);
router.get("/:categoryId", api.getCategoryProductById);

router.post("/", api.addCategoryProduct);

router.delete("/:categoryId", jwtAuth, api.deleteCategoryProduct);

export default router;
