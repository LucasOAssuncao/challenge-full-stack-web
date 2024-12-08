const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/errorUtil");
require("dotenv").config();

const register = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (err, existingUser) => {
    if (err) return next(new AppError("Erro no servidor", 500));
    if (existingUser) return next(new AppError("E-mail já registrado", 400));

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return next(new AppError("Erro ao criptografar senha", 500));

      const userData = { name, email, password: hashedPassword };
      User.create(userData, (err, results) => {
        if (err) return next(new AppError("Erro ao criar usuário", 500));
        res
          .status(201)
          .json({ results, message: "Usuário criado com sucesso!" });
      });
    });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) return next(new AppError("Erro no servidor", 500));
    if (!user) return next(new AppError("E-mail ou senha incorretos", 400));

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return next(new AppError("Erro ao comparar senha", 500));
      if (!match) return next(new AppError("E-mail ou senha incorretos", 400));

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login bem-sucedido", token });
    });
  });
};

module.exports = { register, login };
