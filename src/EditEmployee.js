import axios from 'axios'
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import './App.css'

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/employees/${id}')
        .then(res => setEmployee(res.data))
        .catch(er => console.log(er));
    }, [id])
    return(
        <div className='container'>
            <h1>Edit Employee's Data</h1>
                <p>Employee ID : </p>
                <div className='content'>
                    <p>First Name</p>
                    <input type='text' value={employee.first_name} className='form-control' placeholder='First Name'></input>
                </div>
                <div className='content'>
                    <p>Last Name</p>
                    <input type='text' value={employee.last_name} className='form-control' placeholder='Last Name'></input>
                </div>
                <div className='content'>
                    <p>Department</p>
                    {/* IDK HOW */}
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Choose the Department
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                </div>
                <div className='content'>
                    <p>Salary</p>
                    <input type='text' value={employee.salary} className='form-control' placeholder='Ex: 50000'></input>
                </div>

                <div className='content'>
                    <p>Hire Date</p>
                    <input type='date' value={employee.hire_date} className='form-control'></input>
                </div>

            <button type='submit' className='btn btn-primary btn-sm me-2'>Save</button>
        </div>
    )
}

export default EditEmployee;