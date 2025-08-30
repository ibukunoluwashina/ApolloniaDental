const Department = require("./departments");
const Employee = require("../employee/employees");

const newDepartment = async (req, res) => {
    const { name } = req.body;
    console.log(name);
  try {
    const department = new Department({ name });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findId(id).populate(employees);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("employees");
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmployeesDepartment = async (req, res) => {
  const { id } = req.params;
    try {
    const employeesOfDepartment = await Employee.find({
      department: id,
    }).populate("department", "name -_id");
    if (!employeesOfDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(employeesOfDepartment);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  newDepartment,
  getDepartmentById,
  getAllDepartments,
  getEmployeesDepartment,
};
