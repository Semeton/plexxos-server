import makeValidation from "@withvoid/make-validation";
import UserModel from "../models/User.js";
import FacilityModel from "../models/Facility.js";

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserByEmail: async (req, res) => {
    try {
      const user = await UserModel.getUserByEmail(req.params.email);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onCheckUserCredentials: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByCredentials(email, password);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          email: { type: types.string },
          password: { type: types.string },
          facilityCode: { type: types.string },
        },
      }));

      if (!validation.success) return res.status(400).json(validation);

      const { firstName, lastName, email, password, facilityCode } = req.body;
      const exist = await FacilityModel.findOne({ facilityCode: facilityCode });
      if (!exist) {
        return res
          .status(401)
          .json({ success: false, error: "Facility code is invalid" });
      }
      const user = await UserModel.createUser(
        firstName,
        lastName,
        email,
        password,
        facilityCode
      );
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};

//hash password in mongoose?
// var mongoose = require("mongoose"),
//   Schema = mongoose.Schema,
//   bcrypt = require("bcrypt"),
//   SALT_WORK_FACTOR = 10;

// var UserSchema = new Schema({
//   username: { type: String, required: true, index: { unique: true } },
//   password: { type: String, required: true },
// });

// UserSchema.pre("save", function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// module.exports = mongoose.model("User", UserSchema);

// var mongoose = require(mongoose),
//   User = require("./user-model");

// var connStr = "mongodb://localhost:27017/mongoose-bcrypt-test";
// mongoose.connect(connStr, function (err) {
//   if (err) throw err;
//   console.log("Successfully connected to MongoDB");
// });

// // create a user a new user
// var testUser = new User({
//   username: "jmar777",
//   password: "Password123",
// });

// // save the user to database
// testUser.save(function (err) {
//   if (err) throw err;
// });

// // fetch the user and test password verification
// User.findOne({ username: "jmar777" }, function (err, user) {
//   if (err) throw err;

//   // test a matching password
//   user.comparePassword("Password123", function (err, isMatch) {
//     if (err) throw err;
//     console.log("Password123:", isMatch); // -&gt; Password123: true
//   });

//   // test a failing password
//   user.comparePassword("123Password", function (err, isMatch) {
//     if (err) throw err;
//     console.log("123Password:", isMatch); // -&gt; 123Password: false
//   });
// });
