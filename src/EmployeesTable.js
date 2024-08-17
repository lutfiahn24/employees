import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

function EmployeesTable() {
    const [emp_and_dept, setEmployee] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/employees_and_dept')
        .then(res => setEmployee(res.data))
        .catch(er => console.log(er));
    }, [])

    const handleEdit = (employee_id) => {
        navigate(`/edit/${employee_id}`);
    };

    const handleAddEmployee = () => {
        navigate('/add');
    };

    return(
        <div className='container'>
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
                            <td>{emp.hire_date}</td>
                            <td>
                                <button onClick={() => handleEdit(emp_and_dept.employee_id)} className="btn btn-primary btn-sm me-2">Edit</button>
                                <button className="btn btn-primary btn-sm me-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddEmployee} className="btn btn-primary btn-sm me-2">Add New Employee</button>
        </div>
    )
}

export default EmployeesTable;