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

const Note_Schema = new mongoose.Schema(
  {
    body: String,
  },
  { timestamps: true }
);
const Activity_Schema = new mongoose.Schema(
  {
    title: String,
    type: String,
    startDate: Date,
    startTime: String,
    endDate: Date,
    endTime: String,
    description: String,
    location: String,
    holder: String,
    markDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const File_Schema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    type: String,
  },
  { timestamps: true }
);
const Mail_Schema = new mongoose.Schema(
  {
    mailId: String,
    senderEmail: String,
    receiverEmail: String,
    Subject: String,
  },
  { timestamps: true }
);

const Stage_Schema = new mongoose.Schema(
  {
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Card_Schema = new mongoose.Schema(
  {
    clientDetails: ClientDetails_Schema,
    value: Value_Schema,
    stages: [Stage_Schema],
    color: String,
    expectedClosingDate: { type: Date, default: new Date() },
    notes: [Note_Schema],
    activities: [Activity_Schema],
    files: [File_Schema],
    mails: [Mail_Schema],
  },
  { timestamps: true }
);

const Card_Model = mongoose.model("Card", Card_Schema);
module.exports = Card_Model;
