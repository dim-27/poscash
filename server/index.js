import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import { connetionMysql } from "./src/config/db.js"

import userRoutes from "./src/routes/user.js"
import roleRoutes from "./src/routes/role.js"
import productRoutes from "./src/routes/product.js"
import cartRoutes from "./src/routes/cart.js"
import cartItemRoutes from "./src/routes/cart-item.js"
import categoryRoutes from "./src/routes/category.js"
import categoryProductRoutes from "./src/routes/category-product.js"
import orderItemRoutes from "./src/routes/order-item.js"
import orderRoutes from "./src/routes/order.js"

import notFound from "./src/utils/not-found.js"
import errorHandler from "./src/utils/error-handler.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(cors())
app.use(helmet())

connetionMysql()

app.use("/api/user", userRoutes)
app.use("/api/role", roleRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/cart-item", cartItemRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/category-product", categoryProductRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/order-item", orderItemRoutes)

app.use(errorHandler)
app.use(notFound)

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`)
})
