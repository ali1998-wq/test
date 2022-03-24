const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sectorroute = require("./routes/sector");
const subsector = require("./routes/subsector");
const userRoute = require("./routes/user");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser({ extends: true }));

mongoose
  .connect(
    "mongodb+srv://muhammadAli:Journey!24@ababeel.vez20.mongodb.net/test?retryWrites=true&w=majority",
    {}
  )
  .then((res) => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("something is wrong in databsae connection");
  });

app.use("/api", sectorroute);
app.use("/api", subsector);
app.use("/api", userRoute);

app.listen(PORT, () => console.log("server is running on prot" + PORT));
