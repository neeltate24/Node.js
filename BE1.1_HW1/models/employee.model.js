//1

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeImageUrl: { type: String, required: true },
    employeeName: { type: String, required: true },
    employeeId: { type: Number, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
