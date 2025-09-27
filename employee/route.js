const express = require("express");
const { authAdmin } = require("../middleware/auth");
const {
  newEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  setEmployeeDepartment,
} = require("./Handler");

const router = express.Router();

// Public routes (anyone can view)
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

// Admin-only routes (only admins can create, update, delete employees)
router.post("/", authAdmin, newEmployee);
router.post("/set-department", authAdmin, setEmployeeDepartment);
router.put("/:id", authAdmin, updateEmployee);
router.delete("/:id", authAdmin, deleteEmployee);

module.exports = router;
