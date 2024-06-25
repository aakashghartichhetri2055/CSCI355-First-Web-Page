require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connection to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); 
    }
    console.log('MySQL connected...');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Contact saved successfully');
        }
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
