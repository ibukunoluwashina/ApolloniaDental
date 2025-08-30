const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        reqiure: true,
        unique: true
    },

});

module.exports = mongoose.model("Department", departmentSchema);