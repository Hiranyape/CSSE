const mongoose = require("mongoose");

var Order = mongoose.model("Order", {
  itemName: { type: String },
  quantity: { type: Number },
  supplier: { type: String },
  site: { type: String  },
  status: {
    type: String,
    enum: ["Wait", "Approve", "Partial Approve", "Decline", "Return"],
  },
  description: { type: String }
});

module.exports = { Order };