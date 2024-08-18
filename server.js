const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kotabogor',
  database: 'mst_employee'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API routes
app.get('/employees_and_dept', (req, res) => {
  const query = `
    SELECT e.employee_id, CONCAT(e.first_name, ' ', e.last_name) AS full_name,
           d.department_name, e.salary, e.hire_date
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.department_id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/departments', (req, res) => {
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM employees WHERE employee_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });
});

app.post('/employees', (req, res) => {
  const { first_name, last_name, department_id, salary, hire_date } = req.body;
  const query = 'INSERT INTO employees (first_name, last_name, department_id, salary, hire_date) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [first_name, last_name, department_id, salary, hire_date], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Employee added successfully' });
  });
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, department_id, salary, hire_date } = req.body;
  const query = `
    UPDATE employees
    SET first_name = ?, last_name = ?, department_id = ?, salary = ?, hire_date = ?
    WHERE employee_id = ?
  `;
  connection.query(query, [first_name, last_name, department_id, salary, hire_date, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Employee updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE employee_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve React app for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
