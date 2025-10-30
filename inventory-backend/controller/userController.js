import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/avatars';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: userId-timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields (name, email, password) are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const [existingUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, 3]
    );

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.insertId,
        name: name,
        email: email,
        role_id: 3,
      }
    });
  } catch (err) {
    console.error("Error in user creation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ message: "Invalid page number. Must be a positive integer." });
  }
  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({ message: "Invalid limit. Must be a positive integer." });
  }

  try {
    const offset = (page - 1) * limit;

    const [users] = await pool.execute(
      "SELECT id, name, email, phone, username, avatar, role_id, created_at, updated_at FROM users LIMIT ? OFFSET ?",
      [Number(limit), Number(offset)]
    );

    const [totalUsers] = await pool.execute("SELECT COUNT(*) AS count FROM users");
    const totalCount = totalUsers[0].count;

    res.json({
      users,
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return res.status(400).json({ message: "Invalid user ID. ID must be a positive integer." });
  }

  try {
    const [user] = await pool.execute(
      "SELECT id, name, email, phone, username, avatar, role_id, created_at, updated_at FROM users WHERE id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    res.json(user[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const editUserById = (req, res) => {
  upload.single('avatar')(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    const { name, email, phone, username } = req.body;
    const userId = req.params.id;

    console.log("=== Update User Request ===");
    console.log("User ID:", userId);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
      // Validate user ID
      if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Check if user exists
      const [existingUser] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare update data
      const updates = [];
      const values = [];

      if (name) {
        updates.push("name = ?");
        values.push(name);
      }

      if (email) {
        updates.push("email = ?");
        values.push(email);
      }

      if (phone !== undefined) {
        updates.push("phone = ?");
        values.push(phone);
      }

      if (username) {
        updates.push("username = ?");
        values.push(username);
      }

      // Only update avatar if a new file was uploaded
      if (req.file) {
        // Normalize path for URLs (replace backslashes with forward slashes)
        const normalizedPath = req.file.path.replace(/\\/g, '/');
        updates.push("avatar = ?");
        values.push(normalizedPath);

        // Optional: Delete old avatar file
        if (existingUser[0].avatar && fs.existsSync(existingUser[0].avatar)) {
          fs.unlinkSync(existingUser[0].avatar);
        }
      }

      // If no fields to update
      if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      // Add userId to values array
      values.push(userId);

      // Execute update query
      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      await pool.execute(query, values);

      // Fetch updated user
      const [updatedUser] = await pool.execute(
        "SELECT id, name, email, phone, username, avatar, role_id FROM users WHERE id = ?",
        [userId]
      );

      res.json({
        message: "User updated successfully",
        user: updatedUser[0]
      });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ 
        message: "Internal Server Error", 
        error: err.message 
      });
    }
  });
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete avatar file if exists
    if (user[0].avatar && fs.existsSync(user[0].avatar)) {
      fs.unlinkSync(user[0].avatar);
    }

    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export the upload middleware for use in routes
export { upload };