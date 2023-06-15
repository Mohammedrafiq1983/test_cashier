const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "B@ghdad12345!!",
  database: "my_schema",
});

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/users", (req, res) => {
  const { id, name, email } = req.body;

  const query = "INSERT INTO users (id, name, email) VALUES (?, ?, ?)";
  connection.query(query, [id, name, email], (error, results) => {
    if (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "User created successfully" });
    }
  });
});

app.put("/users/:id", (req, res) => {
  // Update a user in the database based on the request body and the provided ID and send the response
  // You will implement this code later
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
