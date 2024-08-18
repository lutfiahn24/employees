import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch employee details
        axios.get(`http://localhost:3000/employees/${id}`)
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));

        // Fetch departments for dropdown
        axios.get('http://localhost:3000/departments')
        .then(res => setDepartments(res.data))
        .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/employees/${id}`, employee)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className='container'>
            <h1>Edit Employee's Data</h1>
            <form onSubmit={handleSubmit}>
                <div className='content'>
                    <p>First Name</p>
                    <input
                        type='text'
                        name='first_name'
                        value={employee.first_name}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='First Name'
                    />
                </div>
                <div className='content'>
                    <p>Last Name</p>
                    <input
                        type='text'
                        name='last_name'
                        value={employee.last_name}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Last Name'
                    />
                </div>
                <div className='content'>
                    <p>Department</p>
                    <select
                        name='department_id'
                        value={employee.department_id}
                        onChange={handleChange}
                        className='form-control'
                    >
                        {departments.map(dept => (
                            <option key={dept.department_id} value={dept.department_id}>
                                {dept.department_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='content'>
                    <p>Salary</p>
                    <input
                        type='text'
                        name='salary'
                        value={employee.salary}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Ex: 50000'
                    />
                </div>
                <div className='content'>
                    <p>Hire Date</p>
                    <input
                        type='date'
                        name='hire_date'
                        value={employee.hire_date.split('T')[0]} // Format date to YYYY-MM-DD
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-sm me-2'>Save</button>
            </form>
        </div>
    );
}

export default EditEmployee;
