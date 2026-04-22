const mongoose = require("mongoose");

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const validateRegisterInput = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 50) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 2 and 50 characters",
    });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be either user or admin",
    });
  }

  return next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  return next();
};

const validateTaskCreateInput = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (title.trim().length < 2 || title.trim().length > 120) {
    return res.status(400).json({
      success: false,
      message: "Title must be between 2 and 120 characters",
    });
  }

  if (description !== undefined && (typeof description !== "string" || description.length > 500)) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string up to 500 characters",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean value",
    });
  }

  return next();
};

const validateTaskUpdateInput = (req, res, next) => {
  const allowedFields = ["title", "description", "completed"];
  const updateFields = Object.keys(req.body);

  if (updateFields.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }

  const hasInvalidField = updateFields.some((field) => !allowedFields.includes(field));
  if (hasInvalidField) {
    return res.status(400).json({
      success: false,
      message: "Only title, description, and completed can be updated",
    });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 2 || title.trim().length > 120) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 2 and 120 characters",
      });
    }
  }

  if (description !== undefined && (typeof description !== "string" || description.length > 500)) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string up to 500 characters",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean value",
    });
  }

  return next();
};

const validateObjectIdParam = (paramName) => (req, res, next) => {
  const id = req.params[paramName];

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${paramName}`,
    });
  }

  return next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateTaskCreateInput,
  validateTaskUpdateInput,
  validateObjectIdParam,
};
