const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    workerType: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    problemImage: {
      type: String,
    },
    bids: {
      type: [bidSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
