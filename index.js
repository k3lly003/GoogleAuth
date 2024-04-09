const cors = require("cors");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoute =require("./routes/auth.js")
const app = express();
require("dotenv").config();
const passportSetUp = require("./passport");


app.use(
  cookieSession({ name: "session", keys: ["kingKelly"], maxAge: 24 * 60 * 60 * 1000 })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
