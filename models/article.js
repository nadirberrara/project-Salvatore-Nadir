const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TYPES = require("./reaction-types");

const articleSchema = new Schema({
  picture: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  //
    reaction: {
    type: String,
    enum: TYPES
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

articleSchema.virtual("inputFormattedDate").get(function() {
  return moment(this.dateCreated).format("YYYY-MM-DD");
});

articleSchema.methods.belongsTo = function(user) {
  return this._creator.equals(user._id);
};

module.exports = mongoose.model(“Article”, articleSchema);
