const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Employees", employeesSchema);
