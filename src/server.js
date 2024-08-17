const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
