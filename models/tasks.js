const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  text: String,
  isCheck: Boolean
});

module.exports = mongoose.model("tasks", tasksSchema);
