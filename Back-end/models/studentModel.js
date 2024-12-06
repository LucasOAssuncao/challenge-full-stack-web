const db = require("../config/db");

const Student = {
  create: (studentData, callback) => {
    const query = "INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)";
    const { name, email, ra, cpf } = studentData;

    db.query(query, [name, email, ra, cpf], callback);
  },

  update: (id, studentData, callback) => {
    const query = `
      UPDATE students 
      SET name = ?, email = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    const { name, email } = studentData;

    db.query(query, [name, email, id], callback);
  },

  findAll: (callback) => {
    const query = "SELECT * FROM students";

    db.query(query, callback);
  },

  findById: (id, callback) => {
    const query = "SELECT * FROM students WHERE id = ?";
    
    db.query(query, [id], callback);
  },

  findByRA: (ra, callback) => {
    const query = "SELECT * FROM students WHERE ra = ?";
    db.query(query, [ra], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  delete: (id, callback) => {
    const query = "DELETE FROM students WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Student;