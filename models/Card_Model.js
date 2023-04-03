const mongoose = require("mongoose");

const Phone_Schema = new mongoose.Schema({
  number: Number,
  prefix: Number,
  type: String,
});
const Email_Schema = new mongoose.Schema({
  email: String,
  type: String,
});

const ClientDetails_Schema = new mongoose.Schema({
  company: String,
  title: String,
  contactPerson: String,
  phone: Phone_Schema,
  email: Email_Schema,
});

const Value_Schema = new mongoose.Schema({
  value: Number,
  type: String,
});

const Card_Schema = new mongoose.Schema({
  clientDetails: ClientDetails_Schema,
  value: Value_Schema,
  stage: String,
  color: String,
  expectedClosingDate: { type: Date, default: new Date() },
});

const Card_Model = mongoose.model("Card", Card_Schema);
module.exports = Card_Model;
