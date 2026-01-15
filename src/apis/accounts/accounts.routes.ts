import { Router, Response, Request } from "express";
import {
  getAllacounts,
  addAccount,
  getOneAccount,
  deleteAccount,
} from "../../../src/apis/accounts/accounts.controllers";

const accountsRouter = Router();

accountsRouter.get("/", getAllacounts);
accountsRouter.post("/addaccount", addAccount);
accountsRouter.get("/:id", getOneAccount);
accountsRouter.delete("/:id", deleteAccount);
export default accountsRouter;
