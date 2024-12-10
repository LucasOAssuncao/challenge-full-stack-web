const studentModel = require("../../models/studentModel");
const studentController = require("../../controllers/studentController");
const httpMocks = require("node-mocks-http");
const AppError = require("../../utils/errorUtil");

jest.mock("../../models/studentModel");

jest.mock('mysql2', () => {
  const mockConnection = {
    connect: jest.fn((cb) => cb(null)),
    query: jest.fn((query, values, cb) => cb(null, [])),
    end: jest.fn(),
  };
  return {
    createConnection: jest.fn(() => mockConnection),
  };
});

describe("Student Controller", () => {
  describe("createStudent", () => {
    it("deve criar um estudante com sucesso", async () => {
      const req = httpMocks.createRequest({
        body: { name: "Lucas", email: "lucas@test.com", cpf: "12345678900", ra: "12345" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.findByRA.mockImplementation((ra, callback) => callback(null, null));
      studentModel.create.mockImplementation((data, callback) => callback(null, { insertId: 1 }));

      await studentController.createStudent(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "Estudante cadastrado com sucesso",
        studentId: 1,
      });
    });

    it("deve retornar erro se o RA já existir", async () => {
      const req = httpMocks.createRequest({
        body: { name: "Lucas", email: "lucas@test.com", cpf: "12345678900", ra: "12345" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.findByRA.mockImplementation((ra, callback) => callback(null, { id: 1 }));

      await studentController.createStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(new AppError("RA já cadastrado", 400));
    });

    it("deve retornar erro do servidor se findByRA falhar", async () => {
      const req = httpMocks.createRequest({
        body: { name: "Lucas", email: "lucas@test.com", cpf: "12345678900", ra: "12345" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.findByRA.mockImplementation((ra, callback) => callback(new Error()));

      await studentController.createStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(new AppError("Erro no servidor", 500));
    });
  });

  describe("updateStudent", () => {
    it("deve atualizar um estudante com sucesso", async () => {
      const req = httpMocks.createRequest({
        params: { id: "1" },
        body: { name: "Lucas Atualizado", email: "lucas.atualizado@test.com" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.update.mockImplementation((id, data, callback) =>
        callback(null, { affectedRows: 1 })
      );

      await studentController.updateStudent(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        message: "Estudante atualizado com sucesso",
      });
    });

    it("deve retornar erro se o estudante não for encontrado", async () => {
      const req = httpMocks.createRequest({
        params: { id: "1" },
        body: { name: "Lucas Atualizado", email: "lucas.atualizado@test.com" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.update.mockImplementation((id, data, callback) =>
        callback(null, { affectedRows: 0 })
      );

      await studentController.updateStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(new AppError("Estudante não encontrado", 404));
    });

    it("deve retornar erro do servidor se update falhar", async () => {
      const req = httpMocks.createRequest({
        params: { id: "1" },
        body: { name: "Lucas Atualizado", email: "lucas.atualizado@test.com" },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      studentModel.update.mockImplementation((id, data, callback) =>
        callback(new Error())
      );

      await studentController.updateStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(new AppError("Erro ao atualizar estudante", 500));
    });
  });
});
