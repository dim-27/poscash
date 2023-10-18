import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import errorHandler from "./src/utils/error-handler.js";
import notFound from "./src/utils/not-found.js";
import { connetionMysql } from "./src/config/db.js";
import { generateCSV } from "./src/helpers/generate-csv.js";

import userRoutes from "./src/routes/user.js";
import roleRoutes from "./src/routes/role.js";
import productRoutes from "./src/routes/product.js";
import cartRoutes from "./src/routes/cart.js";
import categoryRoutes from "./src/routes/category.js";
import orderRoutes from "./src/routes/order.js";
import adminRoutes from "./src/routes/admin.js";
import initRoutes from "./src/routes/init.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

connetionMysql();
// generateCSV();

app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/init", initRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
