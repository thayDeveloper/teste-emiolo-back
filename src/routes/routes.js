const router = require("express").Router();
const passport = require("../passport");
const Loaders = require("../db/index");
const {
  getUser,
  getListUsers,
  currentUser,
} = require("../controllers/listUser");

Loaders.start();
router.post("/register");

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/error",
    session: true,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:8080/#/home");
  }
);
router.get("/listUser/:id", getUser);
router.get("/listUsers/", getListUsers);
router.get("/currentUser/", currentUser);

module.exports = router;
