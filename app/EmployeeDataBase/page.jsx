'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Home() {
  const [employeedetails, setEmployeeDetails] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // New state for tracking selected row

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    const response = await axios.get("/api/employeedetails");
    setEmployeeDetails(response.data.data);
  };

  const addEmployeeDetails = async () => {
    try {
      await axios.post("/api/employeedetails", { name, email, phone });
      fetchEmployeeDetails();
      resetForm();
      setShowAddForm(false);
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "An unknown error occurred.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const updateEmployeeDetails = async () => {
    try {
      await axios.put(`/api/employeedetails/${selectedEmployee._id}`, { name, email, phone });
      fetchEmployeeDetails();
      resetForm();
      setShowUpdateForm(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "An unknown error occurred.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const deleteEmployeeDetails = async (id) => {
    await axios.delete(`/api/employeedetails/${id}`);
    fetchEmployeeDetails();
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    setSelectedEmployee(null);
    setSelectedEmployeeId(null); // Reset the selected row ID
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee DataBase</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowAddForm(true);
            setShowUpdateForm(false);
            setShowDeleteConfirm(null);
            resetForm();
          }}
        >
          Add New Employee
        </button>
      </div>

      {/* Add Employee Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto text-gray-800">
          <h2 className="font-bold mb-4 text-blue-500 text-2xl">Add Employee</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input className="w-full p-2 mb-2 border rounded" placeholder="Name of the Employee" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white p-2 rounded w-full" onClick={addEmployeeDetails}>Add Employee</button>
            <button className="bg-gray-500 text-white p-2 rounded w-full" onClick={() => { setShowAddForm(false); resetForm(); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Update Employee Form */}
      {showUpdateForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto text-gray-800">
          <h2 className="text-2xl text-green-500 font-bold mb-4">Update Employee</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white p-2 rounded w-full" onClick={updateEmployeeDetails}>Update</button>
            <button className="bg-gray-500 text-white p-2 rounded w-full" onClick={() => { setShowUpdateForm(false); resetForm(); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="bg-red-100 p-4 rounded-lg shadow-md mb-4 max-w-xs mx-auto flex justify-between items-center text-gray-800">
          <p className="items-center">Are you sure?</p>
          <div>
            <button className="bg-red-500 text-white p-2 rounded mr-2" onClick={() => deleteEmployeeDetails(showDeleteConfirm)}>OK</button>
            <button className="bg-gray-500 text-white p-2 rounded" onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Employee List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500">
              <th className="border p-2">Employee Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone No.</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeedetails.map((employee) => (
              <tr
                key={employee._id}
                className={`border ${selectedEmployeeId === employee._id ? "bg-gray-400" : ""}`} // Conditionally apply bg-gray-400
              >
                <td className="border p-2">{employee.name}</td>
                <td className="border p-2">{employee.email}</td>
                <td className="border p-2">{employee.phone}</td>
                <td className="border p-2 flex space-x-2 justify-center">
                  <FaEdit
                    className="text-green-500 cursor-pointer"
                    onClick={() => {
                      setShowAddForm(false);
                      setShowDeleteConfirm(null);
                      setSelectedEmployee(employee);
                      setSelectedEmployeeId(employee._id); // Set selected row ID
                      setName(employee.name);
                      setEmail(employee.email);
                      setPhone(employee.phone);
                      setShowUpdateForm(true);
                      setError("");
                    }}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setShowAddForm(false);
                      setShowUpdateForm(false);
                      setShowDeleteConfirm(employee._id);
                      setSelectedEmployeeId(employee._id); // Set selected row ID
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

