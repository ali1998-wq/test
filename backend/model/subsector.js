const mongoose = require("mongoose");

const subsectorScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sectors",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subsectors", subsectorScheema);
