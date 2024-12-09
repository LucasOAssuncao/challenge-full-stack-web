const httpMocks = require("node-mocks-http");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const AppError = require("../../utils/errorUtil");
const userController = require("../../controllers/authController");

jest.mock("bcryptjs", () => ({
  hash: jest
    .fn()
    .mockImplementation((password, salt, callback) =>
      callback(null, "senhaCriptografada")
    ),
  compare: jest
    .fn()
    .mockImplementation((password, hash, callback) => callback(null, true)),
}));

jest.mock("jsonwebtoken");

jest.mock("../models/userModel", () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
}));

describe("User Controller", () => {
  describe("register", () => {
    it("deve registrar um novo usuário com sucesso", () => {
      const req = httpMocks.createRequest({
        body: { email: "novo@teste.com", password: "senha123" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      User.findByEmail.mockImplementation(
        (email, callback) => callback(null, null)
      );
      User.create.mockImplementation((user, callback) =>
        callback(null, { id: 1, email: user.email })
      );

      userController.register(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "Usuário criado com sucesso!",
        results: {
          id: 1,
          email: "novo@teste.com",
        },
      });
    });

    it("deve retornar erro ao tentar registrar um e-mail já existente", () => {
      const req = httpMocks.createRequest({
        body: { email: "existente@teste.com", password: "senha123" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      User.findByEmail.mockImplementation(
        (email, callback) => callback(null, { id: 2, email })
      );

      userController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("E-mail já registrado");
    });
  });

  describe("login", () => {
    it("deve fazer login e retornar um token", () => {
      const req = httpMocks.createRequest({
        body: { email: "usuario@teste.com", password: "senha123" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      User.findByEmail.mockImplementation((email, callback) =>
        callback(null, { id: 1, email, password: "senhaCriptografada" })
      );
      bcrypt.compare.mockImplementation(
        (password, hash, callback) => callback(null, true),
      jwt.sign.mockReturnValue("tokenDeExemplo"));

      userController.login(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        message: "Login bem-sucedido",
        token: "tokenDeExemplo",
      });
    });

    it("deve retornar erro ao tentar logar com e-mail inválido", () => {
      const req = httpMocks.createRequest({
        body: { email: "invalido@teste.com", password: "senha123" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      User.findByEmail.mockImplementation(
        (email, callback) => callback(null, null)
      );

      userController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("E-mail ou senha incorretos");
    });
  });
});
