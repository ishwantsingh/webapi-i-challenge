// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ success: true });
});

server.get("/users", (req, res) => {
  db.find()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("STATUS CODE:500", error);
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(data => {
      console.log(data);
      if (data) {
        res.json(data);
      }
      res.json({
        message: `The user with the specified ID ${id} does not exist.`
      });
    })
    .catch(error => {
      res.json({
        message: `The user with the specified ID ${id} does not exist.`
      });
      console.log("ERROR :404 ", error);
    });
});

server.listen(4000, () =>
  console.log(`
    Listening on port 4000
`)
);
