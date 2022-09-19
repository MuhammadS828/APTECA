const Medicament = require("../models/Medicament.model");

module.exports.medicamentsController = {
  addMed: async (req, res) => {
    try {
      const { name, price, isPrescription, _categoryId } = req.body;
      const medi = await Medicament.create({
        name,
        price,
        isPrescription,
        _categoryId,
      });
      return res.json(med);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteMed: async (req, res) => {
    try {
      await Medicament.findByIdAndDelete(req.params.id);
      return res.json(" Med deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateMed: async (req, res) => {
    try {
      const { name, price, isPrescription, _categoryId } = req.body;
      const med = await Medicament.findByIdAndUpdate(req.params.id, {
        name,
        price,
        isPrescription,
        _categoryId,
      });
      return res.json(med);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllMed: async (req, res) => {
    try {
      const med = await Medicament.find({}).populate("_categoryId", "name");
      return res.json(med);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getMedByCategory: async (req, res) => {
    try {
      const med = await Medicament.find({
        _categoryId: req.params.categoryId,
      }).populate("_categoryId", "name");
      return res.json(med);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async getOneMed(req, res) {
    try {
      const med = await Medicament.findById(req.params.medicamentId).populate(
        "_categoryId",
        "name"
      );
      return res.json(med);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
