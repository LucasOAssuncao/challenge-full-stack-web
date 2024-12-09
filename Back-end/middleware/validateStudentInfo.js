const { body, validationResult } = require("express-validator");

const validateStudentInfo = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido").normalizeEmail(),
  body("cpf")
    .notEmpty()
    .withMessage("O CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage("CPF inválido. Formato correto: 000.000.000-00"),
  body("ra")
    .isLength({ min: 6, max: 6 })
    .withMessage("O RA deve ter exatamente 6 dígitos")
    .matches(/^\d+$/)
    .withMessage("O RA deve conter apenas números"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateStudentInfo;
