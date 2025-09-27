const express = require("express");
const { authAdmin } = require("../middleware/auth");

const router = express.Router();

const {
  newDepartment,
  getDepartmentById,
  getAllDepartments,
  getEmployeesDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./Handler");

// Public routes (anyone can view)
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.get("/:id/employees", getEmployeesDepartment);

// Admin-only routes (only admins can create, update, delete departments)
router.post("/", authAdmin, newDepartment);
router.put("/:id", authAdmin, updateDepartment);
router.delete("/:id", authAdmin, deleteDepartment);

module.exports = router;
