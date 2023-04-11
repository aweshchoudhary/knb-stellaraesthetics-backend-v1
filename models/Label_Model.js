const mongoose = require("mongoose");

const Label_Schema = new mongoose.Schema(
  {
    name: String,
    color: Number,
  },
  { timestamps: true }
);

const Label_Model = mongoose.model("File", Label_Schema);
module.exports = Label_Model;
