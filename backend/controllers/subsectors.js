const Subsector = require("../model/subsector");
exports.createsubsector = (req, res) => {
  const { name, sector } = req.body;
  const sub = new Subsector({
    name,
    sector,
  });
  sub.save((err, subsector) => {
    if (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    } else if (subsector) {
      res.status(201).json({
        message: "subsector created successfully",
      });
    }
  });
};
exports.getsubsector = (req, res) => {
  Subsector.find()
    .populate("sector")
    .exec((err, subsec) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong",
        });
      } else if (subsec) {
        res.status(200).json({
          message: "subsector list fetched",
          data: subsec,
        });
      }
    });
};
