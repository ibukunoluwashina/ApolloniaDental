const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        reqiure: true,
        unique: true
    },

    employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);