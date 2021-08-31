const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const database = require("../connection/db.js");

router.get("/", (req, res) => {
  res.send({
    status: true,
  });
});

router.get("/users", async (req, res) => {
  try {
    const db = database.db("db_latihan");
    const user = await db.collection("users").find().toArray();
    res.send({ data: user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const db = database.db("db_latihan");
    const user = await db.collection("users").insertOne({
      name,
      age,
      status,
    });
    if (user.acknowledged) {
      res.send({ message: "success add data" });
    } else {
      res.send({ message: "failed add data" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;
    const db = database.db("db_latihan");
    const user = await db.collection("users").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          age,
          status,
        },
      }
    );
    if (user.acknowledged) {
      res.send({ message: `success update ${id}` });
    } else {
      res.send({ message: "failed update data" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = database.db("db_latihan");
    const user = await db.collection("users").deleteOne({ _id: ObjectId(id) });
    if (user.acknowledged) {
      res.send({ message: `success delete ${id}` });
    } else {
      res.send({ message: "failed delete data" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
