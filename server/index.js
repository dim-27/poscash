import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connetionMysql } from "./config/db.js";

import notFound from "./utils/not-found.js";
import errorHandler from "./utils/error-handler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

connetionMysql();

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
