const mongoose = require("mongoose");

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
    sector: {
      type: String,
    },
    subsector: {
      type: String,
    },
    id: {
      type: String,
    },
    agreed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userScheema);
