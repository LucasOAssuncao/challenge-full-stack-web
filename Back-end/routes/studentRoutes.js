const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const validateStudentInfo = require("../middleware/validateStudentInfo");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateStudentInfo,
  studentController.createStudent
);
router.put("/:id", authMiddleware, studentController.updateStudent);
router.get("/", authMiddleware, studentController.listStudents);
router.get("/:id", authMiddleware, studentController.getStudentById);
router.delete("/:id", authMiddleware, studentController.deleteStudent);

module.exports = { prefix: "/student", router };
