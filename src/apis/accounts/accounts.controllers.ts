import express, { Response, Request, response } from "express";
import Accounts from "../../models/Accounts";

const app = express();

const getAllacounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Accounts.find().select('-createdAt -updatedAt')
     ;
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

const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const account = await Accounts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(202).json(account);
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

const getOneAccountByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { currency } = req.query;
    console.log(username);
    const account = await Accounts.findOne({ username: username });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    const exchangeRates: { [key: string]: number } = {
      USD: 3.25,
      KWD: 1,
      EUR: 2.8,
      JPY: 512.69,
    };
    if (currency && typeof currency === "string") {
      const rate = exchangeRates[currency.toUpperCase()];
      if (rate) {
        const converteFunds = account.funds * rate;
        return res.status(200).json({
          ...account.toObject(),
          funds: converteFunds,
          currency: currency.toUpperCase(),
        });
      }
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};
const getVipAccounts = async (req: Request, res: Response) => {
  try {
    const { amount } = req.query
    const minAmount = Number (amount) 

    if (!amount || isNaN(minAmount) ){
      return res.status(400).json({
        message: "Please provide a valid amount. Example: /vip?amont=3000"
      })
    }

    const vipAccounts = await Accounts.find( { funds: { $gt: minAmount } } )
    .select('-createdAt -updatedAt')
     ;
    res.status(200).json({ 
      message: `VIP accounts (funds > ${minAmount})`,
      count: vipAccounts.length,
      data: vipAccounts });
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

export {
  getAllacounts,
  addAccount,
  getOneAccount,
  deleteAccount,
  updateAccount,
  getOneAccountByUsername,
  getVipAccounts,
};
