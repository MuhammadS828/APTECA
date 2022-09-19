const mongoose = require("mongoose");

const medicamentSchema = mongoose.Schema({
  name: { type: String, 
    default: "плацебо" },
  price: { type: Number, 
    default: 0 },
  isPrescription: { type: Boolean, 
    default: false },
  _categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

const Medicament = mongoose.model("Medicament", medicamentSchema);

module.exports = Medicament;