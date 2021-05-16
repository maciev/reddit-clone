import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";

import dotenv from "dotenv";
import trim from "./middleware/trim";
import cookieParser from "cookie-parser";

//connect to db using psql, drop tables, delete freom uesres, select * from users, -U postgres, \d \dt c\

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.get("/", (_, res) => res.send("Hello world"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await createConnection();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
});
