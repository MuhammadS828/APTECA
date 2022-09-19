const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(require("./routes/medicaments.route"))
app.use(require("./routes/users.route"))
app.use(require("./routes/categories.route"))


mongoose.connect(
  "mongodb+srv://Magomed:Sup1001magomed@cluster1.om1j1fy.mongodb.net/Apteka",
  (err) => {
    if (err) {
      console.log("err");
    }
    console.log("db connection");
    app.listen(3000, () => {
      console.log("started");
    });
  }
);
