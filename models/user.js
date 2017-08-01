// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    unique: true,
    required: true,
    type: String
  }
  // // DO WE NEED THAT ???????
  // _articlesWritten: {
  //   type: Schema.Types.ObjectID,
  //   ref: "Article"
  // },
  // // DO WE NEED THAT TOO ??????
  // _articlesRead: {
  //   type: Schema.Types.ObjectID,
  //   ref: "Article"
  // }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
