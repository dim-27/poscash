import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connetionMysql } from "./src/config/db.js";

import userRoutes from "./src/routes/user.js";
import roleRoutes from "./src/routes/role.js";
import adminRoutes from "./src/routes/admin.js";


import notFound from "./src/utils/not-found.js";
import errorHandler from "./src/utils/error-handler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

connetionMysql();

app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/admin", adminRoutes);


app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
