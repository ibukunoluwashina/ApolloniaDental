const express = require("express");
const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();
const {
  newUser,
  loginUser,
  getUserAdmin,
  logoutUser,
  testLogin,
} = require("./Handler");

router.post("/register", newUser);
router.post("/login", loginUser);
router.post("/test-login", testLogin);
router.get("/admin/:id", authAdmin, getUserAdmin);
router.post("/logout", auth, logoutUser);
module.exports = router;
