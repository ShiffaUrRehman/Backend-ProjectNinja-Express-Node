const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// Schema and Model for Users
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: 1024,
      required: true,
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 8,
      required: true,
    },
    role: {
      type: String,
      enum: ["Project Manager", "Team Lead", "Team Member"],
      maxlength: 1024,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.comparePassword = function (candidatePassword, next) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return next(err);
//     next(null, isMatch);
//   });
// };

UserSchema.pre("save", function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("user", UserSchema);

module.exports.User = User;
