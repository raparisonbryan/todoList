const mongoose = require("mongoose");

/**
 * Modèle de données des notes de l'utilisateur
 */
const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["A faire", "En cours", "Fini"],
    default: "À faire",
  },
});

/**
 * * Export
 */
module.exports = mongoose.model("Note", noteSchema);
