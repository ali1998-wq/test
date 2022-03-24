const User = require("../model/user");

exports.createuser = async (req, res) => {
  const { id, name, sector, subsector, agreed } = req.body;
  console.log(id, name, sector, subsector, agreed);
  const user = await User.findOne({ id: id }).exec();
  if (user) {
    User.findOneAndUpdate({ id: id }, { name, sector, subsector, agreed }).exec(
      (err, user) => {
        if (err) {
          res.status(500).json({
            message: "something went wrong",
          });
        } else if (user) {
          res.status(201).json({
            message: "user updated",
          });
        }
      }
    );
  } else if (!user) {
    const us = new User({
      name,
      id,
      sector,
      subsector,
      agreed,
    });
    us.save((err, user) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong",
        });
      } else if (user) {
        res.status(201).json({
          message: "user created successfully",
        });
      }
    });
  }
};
exports.getuser = (req, res) => {
  const { id } = req.params;
  User.findOne({ id: id }).exec((err, user) => {
    if (err) {
      res.status(500).json({
        message: "seomthing went wrong",
      });
    } else if (user) {
      res.status(200).json({
        message: "user fetched",
        data: user,
      });
    }
  });
};
