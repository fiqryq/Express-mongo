require("../connection/mongose");
const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.send({ data: user });
    } else {
      res.send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    if (user) {
      res.send({ message: "success delete data" });
    } else {
      res.send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const user = await User.create({ name, age, status });
    if (user) {
      res.send({ message: "success add data user", data: user });
    } else {
      res.send({ message: "failed add data" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;
    const user = await User.updateOne(
      { _id: id },
      { name, age, status },
      { runValidators: true }
    );
    if (user) {
      res.send({ message: `success update ${id}` });
    } else {
      res.send({ message: "failed update data" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
