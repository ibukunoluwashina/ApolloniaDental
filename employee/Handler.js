const Employee = require("./employees");

const newEmployee = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  // Validate input
  if (!firstName || !firstName.trim()) {
    return res.status(400).json({ error: "First name is required" });
  }
  if (!lastName || !lastName.trim()) {
    return res.status(400).json({ error: "Last name is required" });
  }
  // Department is optional - can be null for "No Department"

  try {
    const employee = new Employee({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      department: department || null,
    });
    await employee.save();
    await employee.populate("department", "name");
    res.status(201).json(employee);
  } catch (error) {
    console.error("Employee creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id).populate("department");
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  // Validate input
  if (!firstName || !firstName.trim()) {
    return res.status(400).json({ error: "First name is required" });
  }
  if (!lastName || !lastName.trim()) {
    return res.status(400).json({ error: "Last name is required" });
  }

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { firstName: firstName.trim(), lastName: lastName.trim() },
      { new: true }
    ).populate("department", "name");

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Employee update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setEmployeeDepartment = async (req, res) => {
  const { department_id, employee_id } = req.body;

  try {
    if (!employee_id) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const employee = await Employee.findByIdAndUpdate(
      employee_id,
      { department: department_id || null },
      { new: true }
    ).populate("department", "name");

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Set employee department error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  newEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  setEmployeeDepartment,
};
