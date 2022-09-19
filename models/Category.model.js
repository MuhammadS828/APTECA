const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, default: "Не суть" },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
