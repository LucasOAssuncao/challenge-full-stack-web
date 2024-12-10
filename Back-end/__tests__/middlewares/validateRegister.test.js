const validateRegister = require("../../middleware/validateRegister");
const httpMocks = require("node-mocks-http");

describe("Validate Register Middleware", () => {
  const next = jest.fn();

  const runMiddleware = async (req, res, middlewares) => {
    for (const middleware of middlewares) {
      await middleware(req, res, next);
      if (res.statusCode !== 200) break;
    }
  };

  it("deve passar para o próximo middleware se os dados forem válidos", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Lucas",
        email: "lucas@example.com",
        password: "Senha123@",
      },
    });
    const res = httpMocks.createResponse();

    await runMiddleware(req, res, validateRegister);

    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  it("deve retornar erro se o nome não for fornecido", async () => {
    const req = httpMocks.createRequest({
      body: {
        email: "lucas@example.com",
        password: "Senha123@",
      },
    });
    const res = httpMocks.createResponse();

    await runMiddleware(req, res, validateRegister);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errors: [
        {
          location: "body",
          msg: "O nome é obrigatório",
          path: "name",
          type: "field",
        },
      ],
    });
  });

  it("deve retornar erro se o e-mail for inválido", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Lucas",
        email: "lucas.com",
        password: "Senha123@",
      },
    });
    const res = httpMocks.createResponse();

    await runMiddleware(req, res, validateRegister);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errors: [
        {
          location: "body",
          msg: "E-mail inválido",
          path: "email",
          type: "field",
          value: "lucas.com",
        },
      ],
    });
  });

  it("deve retornar erro se a senha não atender aos critérios", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        name: "João",
        email: "joao@example.com",
        password: "senha123",
      },
    });
    const res = httpMocks.createResponse();
  
    await runMiddleware(req, res, validateRegister);
  
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errors: expect.arrayContaining([
        expect.objectContaining({
          location: "body",
          msg: "A senha deve conter pelo menos uma letra maiúscula",
          path: "password",
        }),
        expect.objectContaining({
          location: "body",
          msg: "A senha deve conter pelo menos um caractere especial",
          path: "password",
        }),
      ]),
    });
  });
});