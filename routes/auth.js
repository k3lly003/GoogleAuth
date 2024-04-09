const router = require("express").Router();
const passport = require("passport");

// const CLIENT_URL = "http://localhost:3030/home";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfully logged In",
      user: req.user,
    });
  }else{
    res.status(403).json({error:true,message:"Not Authorized"});
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/google", passport.authenticate("google",["profile","email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL); 
});

module.exports = router;
