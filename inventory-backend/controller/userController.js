import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { roleHierarchy } from "../utils/roleHierarchy.js";
import { canManageRole, getRoleLevel } from '../utils/roleHierarchy.js';


// import { autoAssignMenuToRole } from "./menuController.js";

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/avatars";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});




export const createUser = (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "File upload failed",
        error: err.message,
      });
    }

    const { name, email, password, phone, username, role_id } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (!role_id) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    // Ensure logged-in user exists
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized. No role found." });
    }

    try {
      // ✅ Fetch target role name from roles table
      const [roleRow] = await pool.execute(
        "SELECT name FROM roles WHERE id = ?",
        [role_id]
      );

      if (roleRow.length === 0) {
        return res.status(400).json({ message: "Invalid role ID." });
      }

      const targetRoleName = roleRow[0].name;
      const creatorRoleName = req.user.role;

      console.log('👤 Creator role:', creatorRoleName);
      console.log('🎯 Target role:', targetRoleName);

      // ✅ Use utility function to check if creator can assign this role
      if (!canManageRole(creatorRoleName, targetRoleName)) {
        return res.status(403).json({
          message: `Access denied. You can only assign roles lower than "${creatorRoleName}".`,
        });
      }

      // Check if user already exists
      const [existingUser] = await pool.execute(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username || email]
      );

      if (existingUser.length) {
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          message: "Email or username already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle avatar
      let avatarPath = null;
      if (req.file) {
        avatarPath = req.file.path.replace(/\\/g, "/");
      }

      // Insert user with role_id
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, phone, username, avatar, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          hashedPassword,
          phone || null,
          username || email,
          avatarPath,
          role_id,
        ]
      );

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: result.insertId,
          name,
          email,
          phone,
          username: username || email,
          avatar: avatarPath,
          role_id,
          role: targetRoleName,
        },
      });
    } catch (err) {
      console.error("Error in user creation:", err);

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// ============= GET CURRENT USER - ALREADY CORRECT ✅ =============
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;  // User ID from authenticated token

    // Query to fetch user details and their role
    const [users] = await pool.execute(
      `SELECT u.id, u.username, u.email, u.role_id, r.name AS role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [userId]
    );

    // Check if user exists
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the first user (since there should be only one)
    res.json(users[0]);
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching current user:", error);

    // Return a 500 status with a generic message
    res.status(500).json({ message: "Error fetching user" });
  }
};

// ============= GET USERS - ALREADY CORRECT ✅ =============
export const getUser = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    username,
    status,
    role,
    sortBy = "date",
    search,
  } = req.query;

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }
  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({ message: "Invalid limit" });
  }

  try {
    const offset = (page - 1) * limit;

    let whereConditions = [];
    let queryParams = [];

    if (search) {
      whereConditions.push(
        "(u.name LIKE ? OR u.email LIKE ? OR u.username LIKE ? OR u.phone LIKE ?)"
      );
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (username) {
      whereConditions.push("u.username LIKE ?");
      queryParams.push(`%${username}%`);
    }

    if (status) {
      whereConditions.push("u.status = ?");
      queryParams.push(status);
    }

    if (role) {
      whereConditions.push("r.name = ?");
      queryParams.push(role);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    let orderByClause = "ORDER BY u.created_at DESC";
    if (sortBy === "newest") {
      orderByClause = "ORDER BY u.created_at DESC";
    } else if (sortBy === "oldest") {
      orderByClause = "ORDER BY u.created_at ASC";
    } else if (sortBy === "date") {
      orderByClause = "ORDER BY u.created_at DESC";
    }

    const query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.phone, 
        u.username, 
        u.avatar, 
        u.role_id,
        u.status,
        u.created_at, 
        u.updated_at,
        r.name as role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      ${whereClause}
      ${orderByClause}
      LIMIT ? OFFSET ?
    `;

    const [users] = await pool.execute(query, [
      ...queryParams,
      Number(limit),
      Number(offset),
    ]);

    const countQuery = `
      SELECT COUNT(*) AS count 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      ${whereClause}
    `;
    const [totalUsers] = await pool.execute(countQuery, queryParams);
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
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// ============= GET USER BY ID - ALREADY CORRECT ✅ =============
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const [user] = await pool.execute(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.phone, 
        u.username, 
        u.avatar, 
        u.role_id,
        u.status,
        u.created_at, 
        u.updated_at,
        r.name as role_name,
        r.permissions as role_permissions
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?`,
      [userId]
    );

    if (user.length === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` });
    }

    res.json(user[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// ============= EDIT USER BY ID - NEEDS CORRECTION =============
export const editUserById = (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const { name, email, phone, username, role_id, status } = req.body;
    const userId = req.params.id;

    try {
      // Validate userId
      if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // ✅ Fetch existing user WITH role name using JOIN
      const [existingUser] = await pool.execute(
        `SELECT u.*, r.name as role_name 
         FROM users u 
         LEFT JOIN roles r ON u.role_id = r.id 
         WHERE u.id = ?`,
        [userId]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentUserRoleName = existingUser[0].role_name;
      const editorRoleName = req.user.role;

      console.log('👤 Editor role:', editorRoleName);
      console.log('🎯 Target user current role:', currentUserRoleName);

      // ✅ Check if editor can modify this user's current role
      if (!canManageRole(editorRoleName, currentUserRoleName)) {
        return res.status(403).json({
          message: `Access denied. You cannot edit users with role "${currentUserRoleName}" or higher.`,
        });
      }

      // ✅ If role is being changed, validate the new role
      if (role_id && role_id !== existingUser[0].role_id) {
        // Fetch new role name
        const [newRoleRow] = await pool.execute(
          "SELECT name FROM roles WHERE id = ?",
          [role_id]
        );

        if (newRoleRow.length === 0) {
          return res.status(400).json({ message: "Invalid role ID." });
        }

        const newRoleName = newRoleRow[0].name;

        console.log('🔄 Changing role to:', newRoleName);

        // Check if editor can assign the new role
        if (!canManageRole(editorRoleName, newRoleName)) {
          return res.status(403).json({
            message: `Access denied. You can only assign roles lower than "${editorRoleName}".`,
          });
        }
      }

      // Check if email or username are already taken
      if (email || username) {
        const [duplicate] = await pool.execute(
          "SELECT * FROM users WHERE (email = ? OR username = ?) AND id != ?",
          [
            email || existingUser[0].email,
            username || existingUser[0].username,
            userId,
          ]
        );
        if (duplicate.length > 0) {
          return res
            .status(400)
            .json({ message: "Email or username already exists" });
        }
      }

      // Build update query
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

      if (role_id) {
        updates.push("role_id = ?");
        values.push(role_id);
      }

      if (status) {
        updates.push("status = ?");
        values.push(status);
      }

      if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, "/");
        updates.push("avatar = ?");
        values.push(normalizedPath);

        if (existingUser[0].avatar && fs.existsSync(existingUser[0].avatar)) {
          fs.unlinkSync(existingUser[0].avatar);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      values.push(userId);

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      await pool.execute(query, values);

      // ✅ Fetch updated user WITH role name
      const [updatedUser] = await pool.execute(
        `SELECT u.id, u.name, u.email, u.phone, u.username, u.avatar, u.role_id, u.status, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.id = ?`,
        [userId]
      );

      res.json({
        message: "User updated successfully",
        user: updatedUser[0],
      });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  });
};

// ============= DELETE USER BY ID - NEEDS CORRECTION =============
export const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // ✅ Fetch user WITH role name using JOIN
    const [user] = await pool.execute(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.id = ?`,
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const targetUserRoleName = user[0].role_name;
    const deleterRoleName = req.user.role;

    console.log('👤 Deleter role:', deleterRoleName);
    console.log('🎯 Target user role:', targetUserRoleName);

    // ✅ Check if deleter can delete this user
    if (!canManageRole(deleterRoleName, targetUserRoleName)) {
      return res.status(403).json({
        message: `Access denied. You cannot delete users with role "${targetUserRoleName}" or higher.`,
      });
    }

    // Delete avatar if exists
    if (user[0].avatar && fs.existsSync(user[0].avatar)) {
      fs.unlinkSync(user[0].avatar);
    }

    // Delete user
    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// export const createUser = (req, res) => {
//   upload.single("avatar")(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({
//         message: "File upload failed",
//         error: err.message,
//       });
//     }

//     const { name, email, password, phone, username, role_id } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Name, email, and password are required",
//       });
//     }

  

//     // Ensure logged-in user exists
//     if (!req.user || !req.user.role) {
//       return res.status(401).json({ message: "Unauthorized. No role found." });
//     }

//     // Fetch selected role details
//     const [roleRow] = await pool.execute(
//       "SELECT name FROM roles WHERE id = ?",
//       [role_id]
//     );

//     if (roleRow.length === 0) {
//       return res.status(400).json({ message: "Invalid role ID." });
//     }

//     const targetRole = roleRow[0].name.toLowerCase();
//     const creatorRole = req.user.role.toLowerCase();

//     if (!roleHierarchy[targetRole]) {
//       return res.status(400).json({ message: "Invalid role specified." });
//     }

//     if (roleHierarchy[targetRole] >= roleHierarchy[creatorRole]) {
//       return res.status(403).json({
//         message: "Insufficient permissions to assign this role.",
//       });
//     }

//     // -------- ROLE VALIDATION END --------

//     try {
//       const [existingUser] = await pool.execute(
//         "SELECT * FROM users WHERE email = ? OR username = ?",
//         [email, username || email]
//       );

//       if (existingUser.length) {
//         if (req.file && fs.existsSync(req.file.path)) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({
//           message: "Email or username already exists",
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       let avatarPath = null;
//       if (req.file) {
//         avatarPath = req.file.path.replace(/\\/g, "/");
//       }

//       const [result] = await pool.execute(
//         "INSERT INTO users (name, email, password, phone, username, avatar, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [
//           name,
//           email,
//           hashedPassword,
//           phone || null,
//           username || email,
//           avatarPath,
//           role_id, // <-- Correct role ID is used here
//         ]
//       );

//       res.status(201).json({
//         message: "User created successfully",
//         user: {
//           id: result.insertId,
//           name,
//           email,
//           phone,
//           username: username || email,
//           avatar: avatarPath,
//           role_id,
//           role: targetRole, // <-- Send role name as well
//         },
//       });
//     } catch (err) {
//       console.error("Error in user creation:", err);

//       if (req.file && fs.existsSync(req.file.path)) {
//         fs.unlinkSync(req.file.path);
//       }

//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
// };






// // In your auth controller
// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//    const [users] = await pool.execute(
//   `SELECT u.id, u.username, u.email, u.role_id, r.name AS role
//    FROM users u
//    LEFT JOIN roles r ON u.role_id = r.id
//    WHERE u.id = ?`,
//   [userId]
// );
// res.json(users[0]);

//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user" });
//   }
// };

// export const getUser = async (req, res) => {
//   const {
//     page = 1,
//     limit = 10,
//     username,
//     status,
//     role,
//     sortBy = "date",
//     search,
//   } = req.query;

//   if (isNaN(page) || page < 1) {
//     return res.status(400).json({ message: "Invalid page number" });
//   }
//   if (isNaN(limit) || limit < 1) {
//     return res.status(400).json({ message: "Invalid limit" });
//   }

//   try {
//     const offset = (page - 1) * limit;

//     let whereConditions = [];
//     let queryParams = [];

//     if (search) {
//       whereConditions.push(
//         "(u.name LIKE ? OR u.email LIKE ? OR u.username LIKE ? OR u.phone LIKE ?)"
//       );
//       const searchTerm = `%${search}%`;
//       queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
//     }

//     if (username) {
//       whereConditions.push("u.username LIKE ?");
//       queryParams.push(`%${username}%`);
//     }

//     if (status) {
//       whereConditions.push("u.status = ?");
//       queryParams.push(status);
//     }

//     if (role) {
//       whereConditions.push("r.name = ?");
//       queryParams.push(role);
//     }

//     const whereClause =
//       whereConditions.length > 0
//         ? `WHERE ${whereConditions.join(" AND ")}`
//         : "";

//     let orderByClause = "ORDER BY u.created_at DESC";
//     if (sortBy === "newest") {
//       orderByClause = "ORDER BY u.created_at DESC";
//     } else if (sortBy === "oldest") {
//       orderByClause = "ORDER BY u.created_at ASC";
//     } else if (sortBy === "date") {
//       orderByClause = "ORDER BY u.created_at DESC";
//     }

//     const query = `
//       SELECT 
//         u.id, 
//         u.name, 
//         u.email, 
//         u.phone, 
//         u.username, 
//         u.avatar, 
//         u.role_id,
//         u.status,
//         u.created_at, 
//         u.updated_at,
//         r.name as role_name
//       FROM users u
//       LEFT JOIN roles r ON u.role_id = r.id
//       ${whereClause}
//       ${orderByClause}
//       LIMIT ? OFFSET ?
//     `;

//     const [users] = await pool.execute(query, [
//       ...queryParams,
//       Number(limit),
//       Number(offset),
//     ]);

//     const countQuery = `
//       SELECT COUNT(*) AS count 
//       FROM users u
//       LEFT JOIN roles r ON u.role_id = r.id
//       ${whereClause}
//     `;
//     const [totalUsers] = await pool.execute(countQuery, queryParams);
//     const totalCount = totalUsers[0].count;

//     res.json({
//       users,
//       page: Number(page),
//       limit: Number(limit),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     });
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err.message });
//   }
// };

// export const getUserById = async (req, res) => {
//   const userId = req.params.id;

//   if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }

//   try {
//     const [user] = await pool.execute(
//       `SELECT 
//         u.id, 
//         u.name, 
//         u.email, 
//         u.phone, 
//         u.username, 
//         u.avatar, 
//         u.role_id,
//         u.status,
//         u.created_at, 
//         u.updated_at,
//         r.name as role_name,
//         r.permission as role_permission
//       FROM users u
//       LEFT JOIN roles r ON u.role_id = r.id
//       WHERE u.id = ?`,
//       [userId]
//     );

//     if (user.length === 0) {
//       return res
//         .status(404)
//         .json({ message: `User with ID ${userId} not found` });
//     }

//     res.json(user[0]);
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err.message });
//   }
// };

// export const editUserById = (req, res) => {
//   // Use multer middleware before your actual logic
//   upload.single("avatar")(req, res, async (err) => {
//     if (err) {
//       console.error("File upload error:", err);
//       return res
//         .status(400)
//         .json({ message: "File upload failed", error: err.message });
//     }

//     // Destructure fields from req.body
//     const { name, email, phone, username, role_id, status } = req.body;
//     const userId = req.params.id;

//     try {
//       // Validate userId
//       if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
//         return res.status(400).json({ message: "Invalid user ID" });
//       }

//       // Check if user exists
//       const [existingUser] = await pool.execute(
//         "SELECT * FROM users WHERE id = ?",
//         [userId]
//       );
//       if (existingUser.length === 0) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Check if email or username are already taken
//       if (email || username) {
//         const [duplicate] = await pool.execute(
//           "SELECT * FROM users WHERE (email = ? OR username = ?) AND id != ?",
//           [
//             email || existingUser[0].email,
//             username || existingUser[0].username,
//             userId,
//           ]
//         );
//         if (duplicate.length > 0) {
//           return res
//             .status(400)
//             .json({ message: "Email or username already exists" });
//         }
//       }

//       // Update fields if provided
//       const updates = [];
//       const values = [];

//       if (name) {
//         updates.push("name = ?");
//         values.push(name);
//       }

//       if (email) {
//         updates.push("email = ?");
//         values.push(email);
//       }

//       if (phone !== undefined) {
//         updates.push("phone = ?");
//         values.push(phone);
//       }

//       if (username) {
//         updates.push("username = ?");
//         values.push(username);
//       }

//       if (role_id) {
//         updates.push("role_id = ?");
//         values.push(role_id);
//       }

//       if (status) {
//         updates.push("status = ?");
//         values.push(status);
//       }

//       if (req.file) {
//         const normalizedPath = req.file.path.replace(/\\/g, "/");
//         updates.push("avatar = ?");
//         values.push(normalizedPath);

//         if (existingUser[0].avatar && fs.existsSync(existingUser[0].avatar)) {
//           fs.unlinkSync(existingUser[0].avatar);
//         }
//       }

//       if (updates.length === 0) {
//         return res.status(400).json({ message: "No fields to update" });
//       }

//       values.push(userId);

//       const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
//       await pool.execute(query, values);

//       const [updatedUser] = await pool.execute(
//         "SELECT id, name, email, phone, username, avatar, role_id, status FROM users WHERE id = ?",
//         [userId]
//       );

//       res.json({
//         message: "User updated successfully",
//         user: updatedUser[0],
//       });
//     } catch (err) {
//       console.error("Error updating user:", err);
//       res.status(500).json({
//         message: "Internal Server Error",
//         error: err.message,
//       });
//     }
//   });
// };

// export const deleteUserById = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
//       userId,
//     ]);

//     if (user.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user[0].avatar && fs.existsSync(user[0].avatar)) {
//       fs.unlinkSync(user[0].avatar);
//     }

//     await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//Profile Crud

export const editProfileById = (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const { name, phone } = req.body;
    const userId = req.user.id;

    try {
      const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      let avatarPath = user[0].avatar;
      if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, "/");
        avatarPath = normalizedPath;

        if (user[0].avatar && fs.existsSync(user[0].avatar)) {
          fs.unlinkSync(user[0].avatar);
        }
      }

      const updates = [];
      const values = [];

      if (name) {
        updates.push("name = ?");
        values.push(name);
      }

      if (phone !== undefined) {
        updates.push("phone = ?");
        values.push(phone);
      }

      if (avatarPath !== user[0].avatar) {
        updates.push("avatar = ?");
        values.push(avatarPath);
      }

      if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      values.push(userId);

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      await pool.execute(query, values);

      res.json({
        message: "Profile updated successfully",
        user: { id: userId, name, phone, avatar: avatarPath },
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  });
};

// Get Profile
export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [user] = await pool.execute(
      `SELECT id, name, email, phone, username, avatar, role_id, status FROM users WHERE id = ?`,
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const getProfileById = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  try {
    // Validate the ID
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Query to fetch the user profile by ID
    const [user] = await pool.execute(
      "SELECT id, name, email, phone, username, avatar, role_id, status FROM users WHERE id = ?",
      [userId]
    );

    // If the user does not exist, return a 404 error
    if (user.length === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` });
    }

    // Return the user's profile data
    res.json(user[0]);
  } catch (err) {
    console.error("Error fetching user profile by ID:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export default {
  editProfileById,
  getProfile,
  getProfileById,
};



// export const createRole = async (req, res) => {
//   let { name, permissions } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Role name is required" });
//   }

//   const normalizedName = name.trim().toLowerCase(); // FIX

//   try {
//     const [existingRole] = await pool.execute(
//       "SELECT * FROM roles WHERE name = ?",
//       [normalizedName]
//     );

//     if (existingRole.length) {
//       return res.status(400).json({ message: "Role already exists" });
//     }

//     const permissionsJson = permissions
//       ? JSON.stringify(permissions)
//       : JSON.stringify({});

//     const [result] = await pool.execute(
//       "INSERT INTO roles (name, permissions) VALUES (?, ?)",
//       [normalizedName, permissionsJson]
//     );

//     res.status(201).json({
//       message: "Role created successfully",
//       role: {
//         id: result.insertId,
//         name: normalizedName,
//         permissions: permissions || {},
//       },
//     });
//   } catch (err) {
//     console.error("Error creating role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const autoAssignMenuToRole = async (roleId, permissions) => {
  try {
    console.log(`\n🔄 ===== AUTO-ASSIGNING MENUS =====`);
    console.log(`🆔 Role ID: ${roleId}`);
    console.log(`📋 Permissions:`, JSON.stringify(permissions, null, 2));
    
    // Get all active menu items with their modules
    const [allMenus] = await pool.execute(
      `SELECT id, label, title, path, parent_id, module 
       FROM menu_items 
       WHERE status = 'active'`
    );

    console.log(`📊 Found ${allMenus.length} active menu items`);

    const menuIdsToAssign = new Set();

    // Loop through each permission module
    for (const [permissionModule, perms] of Object.entries(permissions)) {
      console.log(`\n🔍 Checking permission: "${permissionModule}"`);
      console.log(`   can_view: ${perms.can_view}`);

      // Only assign if can_view is true
      if (perms.can_view !== true) {
        console.log(`   ❌ Skipped (can_view is false)`);
        continue;
      }

      console.log(`   ✅ Processing (can_view is true)`);

      // Find matching menus by module
      let matchCount = 0;
      allMenus.forEach(menu => {
        if (!menu.module) return;

        // Case-insensitive comparison
        if (menu.module.toLowerCase() === permissionModule.toLowerCase()) {
          menuIdsToAssign.add(menu.id);
          console.log(`      ✓ Matched: "${menu.label}" (ID: ${menu.id}, module: ${menu.module})`);
          matchCount++;
        }
      });

      if (matchCount === 0) {
        console.log(`      ⚠️  No menus found with module="${permissionModule}"`);
      } else {
        console.log(`      📦 Found ${matchCount} matching menus`);
      }
    }

    console.log(`\n📊 Total menus matched: ${menuIdsToAssign.size}`);

    // Add parent menus recursively
    const menuIdsArray = Array.from(menuIdsToAssign);
    for (const menuId of menuIdsArray) {
      await addParentMenus(menuId, menuIdsToAssign, allMenus);
    }

    console.log(`📊 After adding parents: ${menuIdsToAssign.size} menus`);

    // Insert into menu_item_roles
    if (menuIdsToAssign.size > 0) {
      const values = Array.from(menuIdsToAssign).map(menuId => [menuId, roleId]);
      
      console.log(`💾 Inserting ${values.length} rows into menu_item_roles...`);
      
      const [insertResult] = await pool.query(
        `INSERT IGNORE INTO menu_item_roles (menu_item_id, role_id) VALUES ?`,
        [values]
      );

      console.log(`✅ Insert result: ${insertResult.affectedRows} rows inserted`);
      console.log(`===== AUTO-ASSIGNMENT COMPLETE =====\n`);
      
      return { success: true, count: menuIdsToAssign.size, inserted: insertResult.affectedRows };
    }

    console.log(`⚠️  No menus to assign`);
    console.log(`===== AUTO-ASSIGNMENT COMPLETE =====\n`);
    return { success: true, count: 0, inserted: 0 };
    
  } catch (error) {
    console.error('❌ ERROR in autoAssignMenuToRole:', error);
    console.error('Stack trace:', error.stack);
    return { success: false, error: error.message };
  }
};

// Helper function to add parent menus recursively
const addParentMenus = async (menuId, menuIdsSet, allMenus) => {
  const menu = allMenus.find(m => m.id === menuId);
  
  if (menu && menu.parent_id) {
    if (!menuIdsSet.has(menu.parent_id)) {
      menuIdsSet.add(menu.parent_id);
      console.log(`   ↳ Added parent menu ID: ${menu.parent_id}`);
      // Recursively add grandparents
      await addParentMenus(menu.parent_id, menuIdsSet, allMenus);
    }
  }
};


export const createRole = async (req, res) => {
  let { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const normalizedName = name.trim();

  try {
    console.log('\n========================================');
    console.log('🆕 CREATING NEW ROLE');
    console.log('========================================');
    console.log('📝 Role Name:', normalizedName);

    // Check if role exists
    const [existingRole] = await pool.execute(
      "SELECT * FROM roles WHERE LOWER(name) = LOWER(?)", 
      [normalizedName]
    );

    if (existingRole.length) {
      console.log('❌ Role already exists');
      return res.status(400).json({ message: "Role already exists" });
    }

    const permissionsJson = JSON.stringify(permissions || {});

    // Insert role
    const [result] = await pool.execute(
      "INSERT INTO roles (name, permissions, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [normalizedName, permissionsJson]
    );

    const newRoleId = result.insertId;
    console.log(`✅ Role created successfully with ID: ${newRoleId}`);

    // ✅ AUTO-ASSIGN MENUS
    if (permissions && Object.keys(permissions).length > 0) {
      console.log(`\n🔄 Starting auto-menu assignment...`);
      const menuResult = await autoAssignMenuToRole(newRoleId, permissions);
      console.log(`📋 Auto-assignment result:`, menuResult);
      
      if (!menuResult.success) {
        console.error(`❌ Menu assignment failed:`, menuResult.error);
      }
    } else {
      console.log('⚠️  No permissions provided, skipping menu assignment');
    }

    console.log('========================================\n');

    res.status(201).json({
      message: "Role created successfully",
      role: {
        id: newRoleId,
        name: normalizedName,
        permissions: permissions || {}
      }
    });

  } catch (err) {
    console.error("❌ Error creating role:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


export const updateRoleById = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    console.log('\n========================================');
    console.log('🔄 UPDATING ROLE');
    console.log('========================================');
    console.log('🆔 Role ID:', id);

    // Check if role exists
    const [existingRole] = await pool.execute(
      "SELECT * FROM roles WHERE id = ?",
      [id]
    );

    if (!existingRole.length) {
      return res.status(404).json({ message: "Role not found" });
    }

    const normalizedName = name?.trim() || existingRole[0].name;
    const permissionsJson = JSON.stringify(permissions || {});

    // Update role
    await pool.execute(
      "UPDATE roles SET name = ?, permissions = ?, updated_at = NOW() WHERE id = ?",
      [normalizedName, permissionsJson, id]
    );

    console.log(`✅ Role updated: ${normalizedName}`);

    // ✅ RE-ASSIGN MENUS
    if (permissions && Object.keys(permissions).length > 0) {
      // Clear existing assignments
      console.log(`🗑️  Clearing existing menu assignments...`);
      await pool.execute(
        "DELETE FROM menu_item_roles WHERE role_id = ?",
        [id]
      );

      // Re-assign based on new permissions
      console.log(`\n🔄 Re-assigning menus...`);
      const menuResult = await autoAssignMenuToRole(id, permissions);
      console.log(`📋 Re-assignment result:`, menuResult);
    }

    console.log('========================================\n');

    res.json({
      message: "Role updated successfully",
      role: {
        id: parseInt(id),
        name: normalizedName,
        permissions: permissions || {}
      }
    });

  } catch (err) {
    console.error("❌ Error updating role:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ============= DIAGNOSTIC ENDPOINTS =============
export const diagnoseRoleMenus = async (req, res) => {
  try {
    const { roleId } = req.params;

    const [role] = await pool.execute(
      "SELECT id, name, permissions FROM roles WHERE id = ?",
      [roleId]
    );

    if (!role.length) {
      return res.status(404).json({ error: "Role not found" });
    }

    const [assignedMenus] = await pool.execute(
      `SELECT m.id, m.label, m.title, m.path, m.module, m.parent_id, m.status
       FROM menu_items m
       INNER JOIN menu_item_roles mir ON m.id = mir.menu_item_id
       WHERE mir.role_id = ?
       ORDER BY m.order_by`,
      [roleId]
    );

    const [allActiveMenus] = await pool.execute(
      `SELECT COUNT(*) as count FROM menu_items WHERE status = 'active'`
    );

    res.json({
      role: {
        id: role[0].id,
        name: role[0].name,
        permissions: JSON.parse(role[0].permissions || '{}')
      },
      assignedMenus,
      stats: {
        totalAssigned: assignedMenus.length,
        totalActive: allActiveMenus[0].count,
        coveragePercent: ((assignedMenus.length / allActiveMenus[0].count) * 100).toFixed(2)
      }
    });
  } catch (err) {
    console.error("Error diagnosing role menus:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reassignMenusForRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const [role] = await pool.execute(
      'SELECT permissions FROM roles WHERE id = ?',
      [roleId]
    );
    
    if (!role.length) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const permissions = JSON.parse(role[0].permissions || '{}');
    
    // Clear existing
    await pool.execute('DELETE FROM menu_item_roles WHERE role_id = ?', [roleId]);
    
    // Re-assign
    const result = await autoAssignMenuToRole(roleId, permissions);
    
    res.json({ 
      message: 'Menus reassigned successfully',
      result 
    });
  } catch (error) {
    console.error('Error reassigning menus:', error);
    res.status(500).json({ error: error.message });
  }
};

// ============= GET MODULES =============
export const getModules = async (req, res) => {
  try {
    console.log("=== getModules called ===");

    // Get unique modules from menu_items table
    const [modules] = await pool.execute(
      `SELECT DISTINCT module 
       FROM menu_items 
       WHERE module IS NOT NULL AND status = 'active'
       ORDER BY module`
    );

    const moduleList = modules.map(m => m.module);
    
    console.log("📋 Modules from database:", moduleList);
    
    res.json({ data: moduleList });
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const [roles] = await pool.execute(`
      SELECT 
        id, 
        name,
        permissions,
        created_at
      FROM roles
      ORDER BY created_at DESC
    `);

    // Parse JSON permissions
    const parsedRoles = roles.map((role) => ({
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : {},
    }));

    res.json({ roles: parsedRoles });
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoleById = async (req, res) => {
  const roleId = req.params.id;

  if (!Number.isInteger(Number(roleId)) || Number(roleId) <= 0) {
    return res.status(400).json({ message: "Invalid role ID" });
  }

  try {
    const [role] = await pool.execute(
      "SELECT id, name, permissions, created_at FROM roles WHERE id = ?",
      [roleId]
    );

    if (role.length === 0) {
      return res
        .status(404)
        .json({ message: `Role with ID ${roleId} not found` });
    }

    const roleData = {
      ...role[0],
      permissions: role[0].permissions ? JSON.parse(role[0].permissions) : {},
    };

    res.json(roleData);
  } catch (err) {
    console.error("Error fetching role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// export const updateRoleById = async (req, res) => {
//   const roleId = req.params.id;
//   let { name, permissions } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Role name is required" });
//   }

//   const normalizedName = name.trim().toLowerCase(); // FIX

//   try {
//     const [existingRole] = await pool.execute(
//       "SELECT * FROM roles WHERE id = ?",
//       [roleId]
//     );

//     if (existingRole.length === 0) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     // Check duplicate name
//     const [duplicate] = await pool.execute(
//       "SELECT * FROM roles WHERE name = ? AND id != ?",
//       [normalizedName, roleId]
//     );

//     if (duplicate.length > 0) {
//       return res.status(400).json({ message: "Role name already exists" });
//     }

//     const permissionsJson = permissions
//       ? JSON.stringify(permissions)
//       : JSON.stringify({});

//     await pool.execute(
//       "UPDATE roles SET name = ?, permissions = ? WHERE id = ?",
//       [normalizedName, permissionsJson, roleId]
//     );

//     res.json({
//       message: "Role updated successfully",
//       role: {
//         id: roleId,
//         name: normalizedName,
//         permissions: permissions || {},
//       },
//     });
//   } catch (err) {
//     console.error("Error updating role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// // ✅ UPDATED: Update Role with Menu Re-assignment
// export const updateRoleById = async (req, res) => {
//   const { id } = req.params;
//   const { name, permissions } = req.body;

//   try {
//     // Check if role exists
//     const [existingRole] = await pool.execute(
//       "SELECT * FROM roles WHERE id = ?",
//       [id]
//     );

//     if (!existingRole.length) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     const normalizedName = name?.trim() || existingRole[0].name;
//     const permissionsJson = JSON.stringify(permissions || {});

//     // Update role
//     await pool.execute(
//       "UPDATE roles SET name = ?, permissions = ?, updated_at = NOW() WHERE id = ?",
//       [normalizedName, permissionsJson, id]
//     );

//     console.log(`✅ Updated role: ${normalizedName} (ID: ${id})`);

//     // ✅ Re-assign menu items based on new permissions
//     if (permissions && Object.keys(permissions).length > 0) {
//       // First, clear existing menu assignments
//       await pool.execute(
//         "DELETE FROM menu_item_roles WHERE role_id = ?",
//         [id]
//       );

//       // Then auto-assign new ones
//       const menuResult = await autoAssignMenuToRole(id, permissions);
//       console.log(`📋 Menu re-assignment result:`, menuResult);
//     }

//     res.json({
//       message: "Role updated successfully",
//       role: {
//         id: parseInt(id),
//         name: normalizedName,
//         permissions: permissions || {}
//       }
//     });

//   } catch (err) {
//     console.error("❌ Error updating role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


export const deleteRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const [role] = await pool.execute("SELECT * FROM roles WHERE id = ?", [
      roleId,
    ]);

    if (role.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Check if users are assigned to this role
    const [usersWithRole] = await pool.execute(
      "SELECT COUNT(*) as count FROM users WHERE role_id = ?",
      [roleId]
    );

    if (usersWithRole[0].count > 0) {
      return res.status(400).json({
        message: `Cannot delete role. ${usersWithRole[0].count} user(s) are assigned to this role.`,
      });
    }

    // Delete role
    await pool.execute("DELETE FROM roles WHERE id = ?", [roleId]);

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ============= PERMISSIONS API =============

// GET - Fetch all modules
// export const getModules = async (req, res) => {
//   try {
//     console.log("=== getModules called ===");

//     const modules = [
//       "Inventory",
//       "Expense",
//       "Product",
//       "Settings",
//       "Category",
//       "Sales",
//       "Purchase",
//       "User Management",
//       "Reports",
//       "Dashboard",
//       "Customers",
//       "Suppliers",
//       "Stock",
//       "Menu Management",
//     ];

//     console.log("Returning modules:", modules);
//     res.json({ data: modules });
//   } catch (err) {
//     console.error("Error fetching modules:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// GET - Fetch permissions for a specific role (from JSON column)
export const getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    console.log("=== getPermissionsByRole DEBUG ===");
    console.log("Requested roleId:", roleId);

    if (!roleId || isNaN(roleId)) {
      console.log("Invalid roleId provided");
      return res.status(400).json({ error: "Invalid role ID" });
    }

    // Get role with permissions
    const [role] = await pool.execute(
      "SELECT id, name, permissions FROM roles WHERE id = ?",
      [roleId]
    );

    console.log("Role found:", role.length > 0);
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Parse JSON permissions
    let permissions = {};
    try {
      permissions = role[0].permissions ? JSON.parse(role[0].permissions) : {};
    } catch (parseError) {
      console.error("Error parsing permissions JSON:", parseError);
      permissions = {};
    }

    console.log("Parsed permissions:", permissions);

    // Convert JSON object to array format for frontend
    const permissionsArray = Object.keys(permissions).map((module) => ({
      module,
      can_create: Boolean(permissions[module].can_create),
      can_edit: Boolean(permissions[module].can_edit),
      can_delete: Boolean(permissions[module].can_delete),
      can_view: Boolean(permissions[module].can_view),
    }));

    console.log("Returning permissions array:", permissionsArray);
    res.json({ data: permissionsArray });
  } catch (err) {
    console.error("Error fetching role permissions:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

// POST - Update permissions for a role (store as JSON)
export const updatePermissions = async (req, res) => {
  try {
    const { roleId, permissions } = req.body;

    console.log("=== updatePermissions DEBUG ===");
    console.log("roleId:", roleId);
    console.log("permissions:", permissions);

    if (!roleId || !Array.isArray(permissions)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Check if role exists
    const [role] = await pool.execute("SELECT id FROM roles WHERE id = ?", [
      roleId,
    ]);

    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Convert array to JSON object format
    const permissionsObject = {};
    permissions.forEach((perm) => {
      permissionsObject[perm.module] = {
        can_create: Boolean(perm.can_create),
        can_edit: Boolean(perm.can_edit),
        can_delete: Boolean(perm.can_delete),
        can_view: Boolean(perm.can_view),
      };
    });

    console.log("Permissions object to save:", permissionsObject);

    // Update role with new permissions
    await pool.execute("UPDATE roles SET permissions = ? WHERE id = ?", [
      JSON.stringify(permissionsObject),
      roleId,
    ]);

    res.json({ message: "Permissions updated successfully" });
  } catch (err) {
    console.error("Error updating permissions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const query = `
      SELECT 
        r.id as role_id,
        r.name as role_name,
        rp.module,
        rp.can_create,
        rp.can_edit,
        rp.can_delete,
        rp.can_view
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      WHERE r.status = 'active'
      ORDER BY r.id, rp.module
    `;

    const [results] = await pool.execute(query);

    // Organize by role
    const permissionsByRole = {};
    results.forEach((row) => {
      if (!permissionsByRole[row.role_id]) {
        permissionsByRole[row.role_id] = {
          role_id: row.role_id,
          role_name: row.role_name,
          permissions: [],
        };
      }
      if (row.module) {
        permissionsByRole[row.role_id].permissions.push({
          module: row.module,
          can_create: Boolean(row.can_create),
          can_edit: Boolean(row.can_edit),
          can_delete: Boolean(row.can_delete),
          can_view: Boolean(row.can_view),
        });
      }
    });

    res.json(Object.values(permissionsByRole));
  } catch (err) {
    console.error("Error fetching permissions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { upload };
