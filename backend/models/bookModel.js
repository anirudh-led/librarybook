const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authour: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    issued: {
      type: Boolean,
      default: false,
    },
    issuedOn: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    issuedTo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
