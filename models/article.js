const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TYPES = require("./article-reaction-types");

const articleSchema = new Schema(
  {
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
    // likes: [
    //   userID: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    //   }]
    // ],
    reactions: [
      {
        reaction: {
          type: String,
          enum: TYPES
        },
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

articleSchema.methods.belongsTo = function(user) {
  return this._creator.equals(user._id);
};

module.exports = mongoose.model("Article", articleSchema);
