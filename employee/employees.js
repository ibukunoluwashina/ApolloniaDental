const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: false,
  },
});

module.exports = mongoose.model("Employees", employeesSchema);
