const mongoose = require("mongoose");

var Construction = mongoose.model("Construction", {
  date: { type: String },
  location: { type: String },
  suppiler: { type: String },
  budget: { type: Number  },
});

module.exports = { Construction };