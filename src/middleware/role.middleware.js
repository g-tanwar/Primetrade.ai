const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user context is missing",
    });
  }

  if (allowedRoles.length === 0) {
    return res.status(500).json({
      success: false,
      message: "Server misconfiguration: no roles provided",
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: you do not have access to this resource",
    });
  }

  return next();
};

module.exports = authorizeRoles;
