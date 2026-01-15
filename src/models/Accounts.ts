import mongoose, { Schema, model } from "mongoose";

const accountSchema = new Schema({
  username: { type: String, require: true },
  funds: { type: Number, require: true },
});

const Account = model("account", accountSchema);
export default Account;
