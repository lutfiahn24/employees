import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeesTable from './EmployeesTable';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/add" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
