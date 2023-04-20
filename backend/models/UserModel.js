const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    
    email: { type: String, unique: true, required: true },

    password: { type: String, required: true },
    
  }
);

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;