const httpMocks = require("node-mocks-http");
const validateStudentInfo = require("../../middleware/validateStudentInfo");

describe("Validate Student Info Middleware", () => {
  it("deve passar para o próximo middleware se os dados forem válidos", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Lucas",
        email: "lucas@example.com",
        cpf: "123.456.789-00",
        ra: "123456",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await validateStudentInfo[0](req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  const runMiddleware = async (req, res, middlewares) => {
    const next = jest.fn();
    for (const middleware of middlewares) {
      await middleware(req, res, next);
      if (res.statusCode !== 200) break;
    }
  };
  
  it("deve retornar erro se o CPF não for fornecido", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Lucas",
        email: "lucas@example.com",
        cpf: "",
        ra: "123456",
      },
    });
    const res = httpMocks.createResponse();
  
    await runMiddleware(req, res, validateStudentInfo);
  
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errors: expect.arrayContaining([
        expect.objectContaining({
          msg: "O CPF é obrigatório",
          path: "cpf",
        }),
      ]),
    });
  });
});
