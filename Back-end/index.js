const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes.prefix, authRoutes.router);
app.use(studentRoutes.prefix, studentRoutes.router);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
