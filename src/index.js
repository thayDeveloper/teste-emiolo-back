require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/routes");
const session = require("express-session");

const app = express();
app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
/* app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      httpOnly: false,
      maxAge: 300000, // 5 min
    },
  })
); */

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
