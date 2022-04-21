const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const schema = require("./schema/schema");

const app = express();
const PORT = 8000;
const URL = process.env.URI;

app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send("ok");
});

mongoose.connect(URL);
const dbConnection = mongoose.connection;
dbConnection.on("error", err => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.use("/graphql", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(cors());

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server started on ${PORT}`)
})
