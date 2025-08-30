const express = require("express");

const router = express.Router();

const {
    newDepartment,
    getDepartmentById,
    getAllDepartments,
    getEmployeesDepartment
} = require("./Handler");

router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);  
router.get("/:id/employees", getEmployeesDepartment);
router.post("/", newDepartment);

module.exports = router;