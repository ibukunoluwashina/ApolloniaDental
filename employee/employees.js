const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
});

module.exports = mongoose.model("Employees", employeesSchema);
