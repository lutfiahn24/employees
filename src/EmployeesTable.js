import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EmployeesTable() {
    const [emp_and_dept, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/employees_and_dept')
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleEdit = (employee_id) => {
        navigate(`/edit/${employee_id}`);
    };

    const handleAddEmployee = () => {
        navigate('/add');
    };

    const handleDelete = (employee_id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`http://localhost:3000/employees/${employee_id}`)
                .then(() => {
                    // Remove deleted employee from the state
                    setEmployee(emp_and_dept.filter(emp => emp.employee_id !== employee_id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container">
            <h1>Employees Table</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {emp_and_dept.map(emp => (
                        <tr key={emp.employee_id}>
                            <td>{emp.employee_id}</td>
                            <td>{emp.full_name}</td>
                            <td>{emp.department_name}</td>
                            <td>{emp.salary}</td>
                            <td>{new Date(emp.hire_date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(emp.employee_id)} className="btn btn-primary btn-sm me-2">Edit</button>
                                <button onClick={() => handleDelete(emp.employee_id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddEmployee} className="btn btn-primary btn-sm me-2">Add New Employee</button>
        </div>
    );
}

export default EmployeesTable;
