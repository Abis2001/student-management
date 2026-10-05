const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "student-db",
    user: "root",
    password: "root",
    database: "student_management",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully");
});

module.exports = connection;