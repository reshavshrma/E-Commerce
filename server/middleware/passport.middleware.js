import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // ✅ Correct import
import { User } from '../models/user.model.js';

// ✅ Local Strategy with email + custom password check
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // 👈 explicitly set field names
    User.authenticate()
  )
);

// ✅ Serialize
passport.serializeUser((user, done) => done(null, user._id));

// ✅ Deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user); 
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
