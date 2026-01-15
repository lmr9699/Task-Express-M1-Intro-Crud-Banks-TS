import express, { Response, Request } from "express";
import Accounts from "../../models/Accounts";

const app = express();

const getAllacounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Accounts.find();
    res.status(200).json({ message: "Found all accounts", data: allAccounts });
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

const addAccount = async (req: Request, res: Response) => {
  try {
    const { username, funds } = req.body;

    const newAccount = await Accounts.create({
      username: username,
      funds: funds,
    });
    res.status(201).json({
      messsage: "Account has been created suyccessfully",
    });
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

const getOneAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const account = await Accounts.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const account = await Accounts.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

export { getAllacounts, addAccount, getOneAccount, deleteAccount };
