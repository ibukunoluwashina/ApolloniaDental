const express = require("express");
const {
    newEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
} = require("./Handler");
const router = express.Router();
router.post("/", newEmployee);
router.get("/:id", getEmployeeById);
router.get("/", getAllEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
module.exports = router;
