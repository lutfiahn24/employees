import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    department_id: '',
    salary: '',
    hire_date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/employees', employee)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <h1>Add New Employee</h1>
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
          {/* dropdown: department_id -> department_name */}
          <input
            type='text'
            name='department_id'
            value={employee.department_id}
            onChange={handleChange}
            className='form-control'
            placeholder='Department ID'
          />
        </div>
        <div className='content'>
          <p>Salary</p>
          <input
            type='text'
            name='salary'
            value={employee.salary}
            onChange={handleChange}
            className='form-control'
            placeholder='Salary'
          />
        </div>
        <div className='content'>
          <p>Hire Date</p>
          <input
            type='date'
            name='hire_date'
            value={employee.hire_date}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary btn-sm me-2'>Save</button>
      </form>
    </div>
  );
}

export default AddEmployee;
