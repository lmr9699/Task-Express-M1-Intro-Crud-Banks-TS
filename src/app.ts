import express, { Request, Response } from "express";
import connectDB from "./database";
import accountsRouter from "./apis/accounts/accounts.routes";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

app.use("/accounts", accountsRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log("Your good");
});
