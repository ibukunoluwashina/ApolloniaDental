const Department = require("./departments");
const Employee = require("../employee/employees");

const newDepartment = async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Department name is required" });
  }

  try {
    // Check if department already exists
    const existingDepartment = await Department.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingDepartment) {
      return res.status(409).json({
        error: `Department "${name}" already exists`,
      });
    }

    const department = new Department({ name: name.trim() });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error("Department creation error:", error);

    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(409).json({
        error: `Department "${name}" already exists`,
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmployeesDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const employeesOfDepartment = await Employee.find({
      department: id,
    }).populate("department", "name -_id");
    if (employeesOfDepartment.length === 0) {
      return res
        .status(404)
        .json({ error: "No employees found in this department" });
    }
    res.status(200).json(employeesOfDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate input
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Department name is required" });
  }

  try {
    // Check if department already exists (excluding current department)
    const existingDepartment = await Department.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (existingDepartment) {
      return res.status(409).json({
        error: `Department "${name}" already exists`,
      });
    }

    const department = await Department.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Department update error:", error);

    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(409).json({
        error: `Department "${name}" already exists`,
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if department has employees
    const employeesInDepartment = await Employee.find({ department: id });

    if (employeesInDepartment.length > 0) {
      return res.status(400).json({
        error: `Cannot delete department. It has ${employeesInDepartment.length} employee(s). Please reassign or remove employees first.`,
      });
    }

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Department deletion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  newDepartment,
  getDepartmentById,
  getAllDepartments,
  getEmployeesDepartment,
  updateDepartment,
  deleteDepartment,
};
