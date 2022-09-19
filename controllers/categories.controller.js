const Category = require("../models/Category.model");

module.exports.categoriesController = {
  addCateg: async (req, res) => {
    try {
      const { name } = req.body;
      const categ = await Category.create({
        name,
      });
      return res.json(categ);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteCateg: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      return res.json("Category deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateCateg: async (req, res) => {
    try {
      const { name } = req.body;
      const categ = await Category.findByIdAndUpdate(req.params.id, {
        name,
      });
      return res.json(categ);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllCateg: async (req, res) => {
    try {
      const categ = await Category.find({});
      return res.json(categ);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
