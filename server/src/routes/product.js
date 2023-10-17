import { Router } from "express"
import api from "../controllers/product/api.js"
import jwtAuth from "../helpers/jwt-auth.js"

const router = Router()

router.get("/", api.getProducts)
router.get("/:productId", api.getProductById)
router.get("/category/:categoryId", api.getAllProductByCategoryId)
router.get("/product-name/:name", api.getProductByName)

router.post("/", api.addProduct)
router.put("/:productId", api.updateProduct)

router.delete("/:productId", jwtAuth, api.deleteProduct)

export default router
