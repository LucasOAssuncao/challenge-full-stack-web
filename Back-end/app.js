const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
