import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = UserModel({ email, passwordHash: hash, fullName });

    const user = await doc.save();
    const token = jwt.sign({ id: user._id }, "key_secret", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Нет пользователя" });

    const corrPass = await bcrypt.compare(password, user.passwordHash);
    if (!corrPass) return res.status(400).json({ message: "Неверный пароль" });

    const token = jwt.sign({ _id: user._id }, "key_secret", {
      expiresIn: "30d",
    });
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось авторизоваться" });
  }
};
