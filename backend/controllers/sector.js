const Sector = require("../model/sector");
const SubSector = require("../model/subsector");
exports.createsector = async (req, res) => {
  const { name } = req.body;
  const sector = await Sector.findOne({ name: name }).exec();
  if (sector) {
    res.status(403).json({
      message: "secotr with this name already exists",
    });
  } else if (!sector) {
    const sec = new Sector({
      name,
    });
    sec.save((err, sector) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong",
        });
      } else if (sector) {
        res.status(201).json({
          message: "sector creted successfully",
        });
      }
    });
  }
};
exports.getsectors = (req, res) => {
  Sector.find().exec((err, sectors) => {
    if (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    } else if (sectors) {
      res.status(200).json({
        message: "sector list fetched",
        data: sectors,
      });
    }
  });
};
exports.editsector = (req, res) => {
  const { name, value, id } = req.body;
  console.log(name, value, id);
  if (name === "sector") {
    Sector.findOneAndUpdate({ _id: id }, { name: value }).exec(
      (err, sector) => {
        if (err) {
          res.status(500).json({
            message: "something went wrong",
          });
        } else if (sector) {
          res.status(201).json({
            message: "sector updated successfully",
          });
        }
      }
    );
  } else if (name === "subsector") {
    console.log("yes");
    SubSector.findOneAndUpdate({ _id: id }, { name: value }).exec(
      (err, sector) => {
        if (err) {
          res.status(500).json({
            message: "something went wrong",
          });
        } else if (sector) {
          res.status(201).json({
            message: "subsector updated successfully",
          });
        }
      }
    );
  }
};
