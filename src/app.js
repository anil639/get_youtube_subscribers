const express = require("express");
const app = express();

const subscribersData = require("./models/subscribers");
// Your code goes here

app.get("/", (req, res) => {
  res.send("Welcome to 3000");
});

//response with an array containing all the subscribers data.
app.get("/subscribers", async (req, res) => {
  try {
    const data = await subscribersData.find().select("-__v");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//response with an array of subscribers with only two fields name and subscribedChannel.
app.get("/subscribers/names", async (req, res) => {
  try {
    const data = await subscribersData
      .find()
      .select("-__v -_id -subscribedDate");
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

// response with a single object of subscribers with given id
app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await subscribersData.findById(id);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message }); // response with status code 400 and error mesage
  }
});

module.exports = app;
