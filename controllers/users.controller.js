const User = require("../models/User.model");
const Medicament = require("../models/Medicament.model");

module.exports.usersController = {
  addUser: async(req, res) => {
    try {
      const { name, wallet, shoppingСart, toPay } = req.body;
      const user = await User.create({
        name,
        wallet,
        shoppingСart,
        toPay,
      });
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteUser: async(req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json("User deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateUser: async(req, res) => {
    try {
      const { name, wallet, shoppingСart, toPay } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, {
        name,
        wallet,
        shoppingСart,
        toPay,
      });
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllUsers: async(req, res) => {
    try {
      const user = await User.find({});
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  topUpWallet: async(req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      let newWallet = user.wallet + Number(req.params.money);
      const data = await User.findByIdAndUpdate(req.params.userId, {
        wallet: newWallet,
      });
      const walletShow = await User.findById(req.params.userId);
      return res.json(
        `Ваш кошелек пополнен на сумму ${req.params.money}. Состояние счета: ${walletShow.wallet}`
      );
    } catch (error) {
      return res.json(error.message);
    }
  },
  addToCart: async(req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const medicament = await Medicament.findById(req.params.medicamentId);
      if (
        medicament.isPrescription === true &&
        user.havePrescription === false
      ) {
        return res.json("Для покупки нужен рецепт от врача");
      } else if (user.shoppingСart.includes(req.params.medicamentId)) {
        return res.json("Товар уже добавлен в корзину");
      } else {
        const newPay = Number(user.toPay) + Number(medicament.price);
        await user.updateOne({
          $push: { shoppingСart: req.params.medicamentId },
          toPay: newPay,
        });
        const toPayShow = await User.findById(req.params.userId);
        return res.json(`Товар добавлен. К оплате: ${toPayShow.toPay}`);
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteToCart: async(req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const medicament = await Medicament.findById(req.params.medicamentId);
      if (!user.shoppingСart.includes(req.params.medicamentId)) {
        return res.json("Товар не был добавлен в корзину");
      } else {
        const newPay = Number(user.toPay) - Number(medicament.price);
        await user.updateOne({
          $pull: { shoppingСart: req.params.medicamentId },
          toPay: newPay,
        });
        const toPayShow = await User.findById(req.params.userId);
        return res.json(`Товар удален. К оплате: ${toPayShow.toPay}`);
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
  buy: async(req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const medicament = await Medicament.findById(req.params.medicamentId);
      if (Number(user.wallet) < Number(user.toPay)) {
        const needAdd = Number(user.toPay) - Number(user.wallet);
        return res.json(
          `Недостаточно средства. Пожалуйста, пополните кошелек на сумму: ${needAdd}`
        );
      } else {
        const newWallet = Number(user.wallet) - Number(user.toPay);
        await User.findByIdAndUpdate(req.params.userId, {
          shoppingСart: [],
          toPay: 0,
          wallet: newWallet,
        });
        const walletShow = await User.findById(req.params.userId);
        return res.json(
          `Спасибо за покупку. Состояние вашего кошелька:${walletShow.wallet}`
        );
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
};