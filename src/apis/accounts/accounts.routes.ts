import { Router, Response, Request } from "express";
import {
  getAllacounts,
  addAccount,
  getOneAccount,
  deleteAccount,
  updateAccount,
  getOneAccountByUsername,
} from "../../../src/apis/accounts/accounts.controllers";

const accountsRouter = Router();

accountsRouter.get("/", getAllacounts);
accountsRouter.post("/addaccount", addAccount);
accountsRouter.get("/:id", getOneAccount);
accountsRouter.delete("/:id", deleteAccount);
accountsRouter.put("/:id", updateAccount);
accountsRouter.get("/username/:username", getOneAccountByUsername);
export default accountsRouter;
