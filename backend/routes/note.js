const express = require("express");
const router = express.Router();
const noteControl = require("../controllers/notes");
const auth = require("../middleware/auth");

/**
 * * Routes
 */
router.post("/", auth, noteControl.createNote);
router.get("/", auth, noteControl.getAllNotes);
router.get("/:id", auth, noteControl.getOneNote);
router.put("/:id", auth, noteControl.modifyNote);
router.delete("/:id", auth, noteControl.deleteNote);
router.put("/:id/status", auth, noteControl.updateStatus);

/**
 * * Export
 */
module.exports = router;
