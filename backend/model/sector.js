const mongoose = require("mongoose");

const sectorScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("sectors", sectorScheema);
