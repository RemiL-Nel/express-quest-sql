const express = require("express");
require("dotenv").config();
const { hashPassword } = require("./auth.js");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite users list");
};

app.get("/", welcome);

const database = require("./database");

app.get("/api/users", database.getUsers);
app.get("/api/users/:id", database.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
app.post("/api/users", hashPassword, database.postUser);
// app.put("/api/users/:id", database.updateUser);
// app.delete("/api/users/:id", database.deleteUser);
