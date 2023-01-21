const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const response = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            provider: profile.provider,
            isVerified: profile.emails[0].verified,
            photo: profile.photos[0].value,
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        return done(null, response.toJSON());
      } catch (error) {
        console.log("caiu no error", error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

module.exports = passport;
