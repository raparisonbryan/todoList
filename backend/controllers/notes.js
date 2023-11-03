const Note = require("../models/Note");
require("dotenv").config();

/**
 * Création d'une note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createNote = (req, res, next) => {
  const note = new Note({
    userId: req.auth.userId,
    title: req.body.title,
    content: req.body.content,
  });
  note
    .save()
    .then(() => {
      res.status(201).json({
        message: "Note créée !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/**
 * Récupération de toutes les notes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllNotes = (req, res, next) => {
  Note.find({ userId: req.auth.userId })
    .then((notes) => {
      if (notes.length === 0) {
        return res.status(404).json({ message: "Aucune note !" });
      }
      res.status(200).json(notes);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

/**
 * Récupération d'une note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOneNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note non trouvée" });
      }

      if (note.userId.toString() !== req.auth.userId) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      res.status(200).json(note);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

/**
 * Modification d'une note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note non trouvée" });
      }

      if (note.userId.toString() !== req.auth.userId) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      note.title = req.body.title;
      note.content = req.body.content;

      return note.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Note modifiée !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/**
 * Suppression d'une note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.deleteNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note non trouvée" });
      }

      if (note.userId.toString() !== req.auth.userId) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      return Note.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      res.status(200).json({
        message: "Note supprimée !",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

/**
 * Modification du status de la note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateStatus = (req, res, next) => {
  const noteId = req.params.id;
  const newStatus = req.body.status;

  if (!newStatus || !["A faire", "En cours", "Fini"].includes(newStatus)) {
    return res.status(400).json({ message: "Statut invalide" });
  }

  Note.findOne({ _id: noteId, userId: req.auth.userId })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note non trouvée" });
      }

      note.status = newStatus;
      return note.save();
    })
    .then(() => {
      res.status(200).json({ message: "Statut de la note mis à jour !" });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};
