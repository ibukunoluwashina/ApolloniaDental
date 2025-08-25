const Employee = require("./employees");

const newEmployee = async (req, res) => {
    const { firstName, LastName } = req.body;
    try {
        const employees = new Employee({ firstName, LastName, person: req.department_id });
        await employees.save();
        res.status(201).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.findById(id).populate("department");
        if (!employees) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("department");
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { firstName, LastName } = req.body;
    try {
        const employees = await Employee.findByIdAndUpdate(id, { firstName, LastName }, { new: true });
        if (!employees) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.findByIdAndDelete(id);
        if (!employees) {
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
    deleteEmployee
};

