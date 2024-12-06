const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  create: (userData, callback) => {
    const { name, email, password } = userData;
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(query, [name, email, password], (err, results) => {
      if (err) return callback(err);
      callback(null, { id: results.insertId, name, email });
    });
  },
};

module.exports = User;
