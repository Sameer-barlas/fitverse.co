# Backend Implementation Reference

This file contains the Node.js and SQL code required for the team to implement the real backend.

## 1. SQL Schema (MySQL)

```sql
CREATE DATABASE fitverse_db;
USE fitverse_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    height DECIMAL(4,2), -- meters
    weight DECIMAL(5,2), -- kg
    bmi DECIMAL(4,1),
    heart_issue BOOLEAN DEFAULT FALSE,
    diabetes BOOLEAN DEFAULT FALSE,
    asthma BOOLEAN DEFAULT FALSE,
    injury BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    reps VARCHAR(50),
    sets INT,
    image_url VARCHAR(500),
    intensity_level ENUM('low', 'medium', 'high')
);
```

## 2. Node.js Express Setup (server.js)

```javascript
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fitverse_db'
});

// Routes

// Signup
app.post('/signup', (req, res) => {
    const { name, email, password, age, height, weight } = req.body;
    const bmi = weight / (height * height);
    const sql = 'INSERT INTO users (name, email, password, age, height, weight, bmi) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, password, age, height, weight, bmi], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'User registered' });
    });
});

// Get Workout (Logic Mirroring Frontend)
app.get('/user/workout/:id', (req, res) => {
    // Fetch user, calc BMI, select from exercises table based on logic
    // Logic: IF bmi < 18.5 SELECT * FROM exercises WHERE category='strength'
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
```
