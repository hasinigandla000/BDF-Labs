
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.json());

// JWT Secret Key
const JWT_SECRET = "my_secret_key";

// Connect to SQLite database
const db = new sqlite3.Database("./users.db");

// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);

// Registration API
app.post("/register", async (req, res) => {
    try {
        const { username, name, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof name !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !name.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing username
        db.get(
            "SELECT * FROM users WHERE username = ?",
            [username.trim()],
            async (err, user) => {
                if (err) {
                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                if (user) {
                    return res.status(400).json({
                        message: "Username already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user into database
                db.run(
                    `INSERT INTO users (username, name, password)
                     VALUES (?, ?, ?)`,
                    [username.trim(), name.trim(), hashedPassword],
                    function (err) {
                        if (err) {
                            if (err.code === "SQLITE_CONSTRAINT") {
                                return res.status(400).json({
                                    message: "Username already exists"
                                });
                            }

                            return res.status(500).json({
                                message: "Database error"
                            });
                        }

                        res.status(201).json({
                            message: "User registered successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username.trim()],
        async (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!user) {
                return res.status(400).json({
                    message: "Invalid username or password"
                });
            }

            try {
                // Compare entered password with stored hash
                const isMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isMatch) {
                    return res.status(400).json({
                        message: "Invalid username or password"
                    });
                }

                // Generate JWT token
                const token = jwt.sign(
                    { username: user.username },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(200).json({
                    jwt_token: token
                });

            } catch (error) {
                res.status(500).json({
                    message: "Server error"
                });
            }
        }
    );
});

// Start server after database is ready
db.get("SELECT 1", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
});
