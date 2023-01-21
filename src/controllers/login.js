const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Aqui você deve importar o modelo do usuário e o arquivo de configuração com a chave secreta do token
const User = require("../models/User");

const login = async (req, res) => {
  try {
    // Obtenha as credenciais do usuário do corpo da solicitação

    const { email, isVerified } = req.body;

    // Procure o usuário no banco de dados com o email fornecido

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Usuário ou senha inválidos" });

    // Verifique se a senha fornecida é válida

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Usuário ou senha inválidos" });

    // Se as credenciais forem válidas, gere um token de acesso

    const payload = { userId: user._id };
    const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });

    // Envie o token de acesso na resposta
    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao processar a solicitação" });
  }
};

module.exports = login;
