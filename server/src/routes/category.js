import { Router } from "express"
import api from "../controllers/category/api.js"
import jwtAuth from "../helpers/jwt-auth.js"

const router = Router()

router.get("/", api.getCategories)
router.get("/:categoryId", api.getCategoryById)

router.post("/", api.addCategory)

router.delete("/:categoryId", jwtAuth, api.deleteCategory)

export default router
