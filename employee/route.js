const express = require("express");
const {
    newEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    setEmployeeDepartment
} = require("./Handler");
const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", newEmployee);
router.post("/set-department", setEmployeeDepartment);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
