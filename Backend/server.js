
const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.send("Student Management Backend is running");
});


// GET all students
app.get("/api/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (error, results) => {

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        res.json(results);

    });
});


// POST - Add student
app.post("/api/students", (req, res) => {

    const { name, email, course } = req.body;

    const sql = `
        INSERT INTO students (name, email, course)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, course],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json({
                message: "Student added successfully",
                id: result.insertId
            });

        }
    );
});


// DELETE student
app.delete("/api/students/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (error, result) => {

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        res.json({
            message: "Student deleted successfully"
        });

    });
});


// Start server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});

