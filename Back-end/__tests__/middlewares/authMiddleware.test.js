const authMiddleware = require("../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const httpMocks = require("node-mocks-http");

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  it("deve retornar erro 401 se o token não for fornecido ou malformado", async () => {
    const req = httpMocks.createRequest({
      headers: {},
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ message: "Token não fornecido ou malformado" });
  });

  it("deve retornar erro 401 se o token estiver expirado", async () => {
    const req = httpMocks.createRequest({
      headers: { authorization: "Bearer expiredtoken" },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      const error = new Error("Token expired");
      error.name = "TokenExpiredError";
      throw error;
    });

    await authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ message: "Token expirado" });
  });

  it("deve retornar erro 401 se o token for inválido", async () => {
    const req = httpMocks.createRequest({
      headers: { authorization: "Bearer invalidtoken" },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      const error = new Error("Invalid token");
      error.name = "JsonWebTokenError";
      throw error;
    });

    await authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ message: "Token inválido" });
  });

  it("deve adicionar o usuário na requisição e chamar next() se o token for válido", async () => {
    const req = httpMocks.createRequest({
      headers: { authorization: "Bearer validtoken" },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify.mockReturnValue({ id: 1, name: "Lucas" });
    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: 1, name: "Lucas" });
    expect(next).toHaveBeenCalled();
  });
});
