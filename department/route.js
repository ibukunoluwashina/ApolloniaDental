const express = require("express");

const router = express.Router();

const {
    newDepartment,
    getDepartmentById,
    getAllDepartments
} = require("./Handler");

router.post("/", newDepartment);
router.get("/:id", getDepartmentById);  
router.get("/", getAllDepartments);

module.exports = router;