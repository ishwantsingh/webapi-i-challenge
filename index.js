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

server.post("/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert({ name: req.body.name, bio: req.body.bio })
      .then(data => {
        res.json({ message: `user of id ${data.id} added to the data base` });
      })
      .catch(error => {
        console.log("STATUS CODE:500", error);
      });
  } else if (!req.body.name || !req.body.bio) {
    res.json({ message: `Please provide name and bio for the user.` });
  }
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (data == 1) {
        res.json({
          message: `The user with the specified ID ${id} has been deleted`
        });
      }
      res.json({
        message: `The user with the specified ID ${id} does not exist.`
      });
    })
    .catch(error => {
      console.log("ERROR :404 ", error);
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  if (req.body.name && req.body.bio) {
    db.update(id, { name: req.body.name, bio: req.body.bio })
      .then(data => {
        if (data == 1)
          res.json({ message: `user of id ${id} has been updated` });
        else {
          res.json({ message: `The user information could not be modified` });
        }
      })
      .catch(error => {
        console.log("STATUS CODE:500", error);
      });
  } else if (!req.body.name || !req.body.bio) {
    res.json({ message: `Please provide name and bio for the user.` });
  }
});

server.listen(4000, () =>
  console.log(`
    Listening on port 4000
`)
);
