import "reflect-metadata";
import express, { response } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import trim from "./middleware/trim";

//connect to db using psql, drop tables, delete freom uesres, select * from users, -U postgres, \d \dt c\

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);

app.get("/", (req, res) => res.send("Hello world"));
app.use("/api/auth", authRoutes);

app.listen(5001, async () => {
  console.log("Server running at http://localhost:5001");

  try {
    await createConnection();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
});
