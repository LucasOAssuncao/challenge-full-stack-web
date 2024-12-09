const errorHandler = require("../../middleware/errorHandler");
const AppError = require("../../utils/errorUtil");
const httpMocks = require("node-mocks-http");

describe("Error Handler Middleware", () => {
  it("deve lidar com erros do tipo AppError e retornar o status e mensagem corretos", () => {
    const error = new AppError("Recurso não encontrado", 404);
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    errorHandler(error, req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({
      status: "error",
      message: "Recurso não encontrado",
    });
  });

  it("deve lidar com erros genéricos e retornar status 500 com mensagem padrão", () => {
    const error = new Error("Erro inesperado");
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    errorHandler(error, req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      status: "error",
      message: "Algo deu errado, por favor tente novamente mais tarde.",
    });
  });
});
