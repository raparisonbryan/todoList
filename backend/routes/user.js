const express = require("express");
const router = express.Router();
const userControl = require("../controllers/users");
const verifyEmail = require("../middleware/email-validator");
const verifyPassword = require("../middleware/password-validator");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

/**
 * * Routes
 */
router.post("/signup", verifyEmail, verifyPassword, userControl.signup);
router.post("/login", userControl.login);
router.get("/", auth, adminAuth, userControl.getAllUsers);
router.get("/:id", auth, userControl.getOneUser);
router.put("/:id", auth, adminAuth, userControl.modifyUser);
router.delete("/:id", auth, adminAuth, userControl.deleteUser);
router.post("/createAdmin", auth, adminAuth, userControl.createAdmin);
router.post("/logout", auth, userControl.logout);

/**
 * * Export
 */
module.exports = router;
