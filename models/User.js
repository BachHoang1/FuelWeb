const UserSchema = new Schema(
  {
    _id :{
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    path: {
      type: String,
    },
  }
);

module.exports = model("users", UserSchema);