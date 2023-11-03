const adminAuth = (req, res, next) => {
  if (req.auth && req.auth.isAdmin) {
    next();
  } else {
    res.status(403).json({
      error:
        "Accès refusé. Seuls les administrateurs ont accès à cette ressource.",
    });
  }
};

module.exports = adminAuth;
