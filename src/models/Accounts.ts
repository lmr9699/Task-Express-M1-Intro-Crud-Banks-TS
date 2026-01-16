import mongoose, { Schema, model } from "mongoose";

const accountSchema = new Schema({
  username: { type: String, require: true },
  funds: { type: Number, require: true },
  currency: { type: String, default: "KWD" },
});

const Account = model("account", accountSchema);
export default Account;
