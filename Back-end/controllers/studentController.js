const Student = require("../models/studentModel");
const AppError = require("../utils/errorUtil");

const createStudent = (req, res, next) => {
  const { name, email, cpf, ra } = req.body;

  const checkUniqueRA = () => {
    Student.findByRA(ra, (err, existingStudent) => {
      if (err) return next(new AppError("Erro no servidor", 500));

      if (existingStudent) {
        return next(new AppError("RA já cadastrado", 400));
      } else {
        const studentData = { name, email, ra, cpf };
        Student.create(studentData, (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return next(
                new AppError("RA, CPF ou E-mail já cadastrados", 400)
              );
            }
            return next(new AppError("Erro ao cadastrar estudante", 500));
          }
          res.status(201).json({
            message: "Estudante cadastrado com sucesso",
            studentId: results.insertId,
          });
        });
      }
    });
  };

  checkUniqueRA();
};

const updateStudent = (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new AppError("Nome e E-mail são obrigatórios", 400));
  }

  Student.update(id, { name, email }, (err, results) => {
    if (err) return next(new AppError("Erro ao atualizar estudante", 500));
    if (results.affectedRows === 0) {
      return next(new AppError("Estudante não encontrado", 404));
    }

    res.status(200).json({ message: "Estudante atualizado com sucesso" });
  });
};

const listStudents = (req, res, next) => {
  Student.findAll((err, results) => {
    if (err) return next(new AppError("Erro ao listar estudantes", 500));

    res.status(200).json(results);
  });
};

const getStudentById = (req, res, next) => {
  const { id } = req.params;

  Student.findById(id, (err, results) => {
    if (err) return next(new AppError("Erro ao buscar estudante", 500));
    if (!results) {
      return next(new AppError("Estudante não encontrado", 404));
    }

    res.status(200).json(results);
  });
};

const deleteStudent = (req, res, next) => {
  const { id } = req.params;

  Student.delete(id, (err, results) => {
    if (err) return next(new AppError("Erro ao excluir estudante", 500));

    if (results.affectedRows === 0) {
      return next(new AppError("Estudante não encontrado", 404));
    }

    res.status(200).json({ message: "Estudante excluído com sucesso" });
  });
};

module.exports = {
  createStudent,
  updateStudent,
  listStudents,
  getStudentById,
  deleteStudent,
};
