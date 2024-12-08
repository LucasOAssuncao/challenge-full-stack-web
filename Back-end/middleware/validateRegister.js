const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("A senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/)
    .withMessage("A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/)
    .withMessage("A senha deve conter pelo menos um número")
    .matches(/[@$!%*?.&#]/)
    .withMessage("A senha deve conter pelo menos um caractere especial"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegister;
