
import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/avatars';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

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

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});



export const createUser = (req, res) => {
  upload.single('avatar')(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    const { name, email, password, phone, username, role_id } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // if (password.length < 6) {
    //   return res.status(400).json({ message: "Password must be at least 6 characters long" });
    // }

    try {
      
      const [existingUser] = await pool.execute(
        "SELECT * FROM users WHERE email = ? OR username = ?", 
        [email, username || email]
      );
      
      if (existingUser.length) {
     
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ message: "Email or username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

    
      let avatarPath = null;
      if (req.file) {
        avatarPath = req.file.path.replace(/\\/g, '/');
      }

    
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, phone, username, avatar, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          name, 
          email, 
          hashedPassword, 
          phone || null, 
          username || email,
          avatarPath,
          role_id || 3
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
          role_id: role_id || 3,
        }
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

// In your auth controller
   export const getCurrentUser = async (req, res) => {
     try {
       const userId = req.user.id;
       const [users] = await pool.execute(
         'SELECT id, username, email, role_id FROM users WHERE id = ?',
         [userId]
       );
       res.json(users[0]);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching user' });
     }
   };

export const getUser = async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    username, 
    status, 
    role, 
    sortBy = 'date',
    search 
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
      whereConditions.push("(u.name LIKE ? OR u.email LIKE ? OR u.username LIKE ? OR u.phone LIKE ?)");
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

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';


    let orderByClause = 'ORDER BY u.created_at DESC';
    if (sortBy === 'newest') {
      orderByClause = 'ORDER BY u.created_at DESC';
    } else if (sortBy === 'oldest') {
      orderByClause = 'ORDER BY u.created_at ASC';
    } else if (sortBy === 'date') {
      orderByClause = 'ORDER BY u.created_at DESC';
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

    const [users] = await pool.execute(query, [...queryParams, Number(limit), Number(offset)]);


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
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

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
        r.permission as role_permission
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?`,
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
  // Use multer middleware before your actual logic
  upload.single('avatar')(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    // Destructure fields from req.body
    const { name, email, phone, username, role_id, status } = req.body;
    const userId = req.params.id;

    try {
      // Validate userId
      if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Check if user exists
      const [existingUser] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if email or username are already taken
      if (email || username) {
        const [duplicate] = await pool.execute(
          "SELECT * FROM users WHERE (email = ? OR username = ?) AND id != ?",
          [email || existingUser[0].email, username || existingUser[0].username, userId]
        );
        if (duplicate.length > 0) {
          return res.status(400).json({ message: "Email or username already exists" });
        }
      }

      // Update fields if provided
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
        const normalizedPath = req.file.path.replace(/\\/g, '/');
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


      const [updatedUser] = await pool.execute(
        "SELECT id, name, email, phone, username, avatar, role_id, status FROM users WHERE id = ?",
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



//Profile Crud

export const editProfileById = (req, res) => {

  upload.single('avatar')(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    const { name, phone } = req.body;
    const userId = req.user.id; 

    try {
    
      const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }


      let avatarPath = user[0].avatar;
      if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, '/');
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

  
      res.json({ message: "Profile updated successfully", user: { id: userId, name, phone, avatar: avatarPath } });
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  });
};

// Get Profile
export const getProfile = async (req, res) => {
  const userId = req.user.id

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
    res.status(500).json({ message: "Internal Server Error", error: err.message });
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
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    // Return the user's profile data
    res.json(user[0]);
  } catch (err) {
    console.error("Error fetching user profile by ID:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export default {
  editProfileById,
  getProfile,
  getProfileById,
};



export const createRole = async (req, res) => {
  let { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const normalizedName = name.trim().toLowerCase();   // FIX

  try {
    const [existingRole] = await pool.execute(
      "SELECT * FROM roles WHERE name = ?", 
      [normalizedName]
    );

    if (existingRole.length) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const permissionsJson = permissions 
      ? JSON.stringify(permissions) 
      : JSON.stringify({});

    const [result] = await pool.execute(
      "INSERT INTO roles (name, permissions) VALUES (?, ?)",
      [normalizedName, permissionsJson]
    );

    res.status(201).json({
      message: "Role created successfully",
      role: {
        id: result.insertId,
        name: normalizedName,
        permissions: permissions || {}
      }
    });

  } catch (err) {
    console.error("Error creating role:", err);
    res.status(500).json({ message: "Internal Server Error" });
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
    const parsedRoles = roles.map(role => ({
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : {}
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
      return res.status(404).json({ message: `Role with ID ${roleId} not found` });
    }

    const roleData = {
      ...role[0],
      permissions: role[0].permissions ? JSON.parse(role[0].permissions) : {}
    };

    res.json(roleData);
  } catch (err) {
    console.error("Error fetching role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateRoleById = async (req, res) => {
  const roleId = req.params.id;
  let { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const normalizedName = name.trim().toLowerCase(); // FIX

  try {
    const [existingRole] = await pool.execute(
      "SELECT * FROM roles WHERE id = ?", 
      [roleId]
    );

    if (existingRole.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Check duplicate name
    const [duplicate] = await pool.execute(
      "SELECT * FROM roles WHERE name = ? AND id != ?",
      [normalizedName, roleId]
    );

    if (duplicate.length > 0) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    const permissionsJson = permissions 
      ? JSON.stringify(permissions) 
      : JSON.stringify({});

    await pool.execute(
      "UPDATE roles SET name = ?, permissions = ? WHERE id = ?",
      [normalizedName, permissionsJson, roleId]
    );

    res.json({
      message: "Role updated successfully",
      role: {
        id: roleId,
        name: normalizedName,
        permissions: permissions || {}
      }
    });

  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const deleteRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const [role] = await pool.execute(
      "SELECT * FROM roles WHERE id = ?", 
      [roleId]
    );

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
        message: `Cannot delete role. ${usersWithRole[0].count} user(s) are assigned to this role.` 
      });
    }

    // Delete role
    await pool.execute(
      "DELETE FROM roles WHERE id = ?", 
      [roleId]
    );

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ============= PERMISSIONS API =============

// GET - Fetch all modules
export const getModules = async (req, res) => {
  try {
    console.log('=== getModules called ===');
    
    const modules = [
      'Inventory',
      'Expense',
      'Product',
      'Settings',
      'Category',
      'Sales',
      'Purchase',
      'User Management',
      'Reports',
      'Dashboard',
      'Customers',
      'Suppliers',
      'Stock',
      'Menu Management'
    ];

    console.log('Returning modules:', modules);
    res.json({ data: modules });
  } catch (err) {
    console.error('Error fetching modules:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET - Fetch permissions for a specific role (from JSON column)
export const getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    console.log('=== getPermissionsByRole DEBUG ===');
    console.log('Requested roleId:', roleId);

    if (!roleId || isNaN(roleId)) {
      console.log('Invalid roleId provided');
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Get role with permissions
    const [role] = await pool.execute(
      'SELECT id, name, permissions FROM roles WHERE id = ?',
      [roleId]
    );
    
    console.log('Role found:', role.length > 0);
    if (role.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Parse JSON permissions
    let permissions = {};
    try {
      permissions = role[0].permissions ? JSON.parse(role[0].permissions) : {};
    } catch (parseError) {
      console.error('Error parsing permissions JSON:', parseError);
      permissions = {};
    }

    console.log('Parsed permissions:', permissions);

    // Convert JSON object to array format for frontend
    const permissionsArray = Object.keys(permissions).map(module => ({
      module,
      can_create: Boolean(permissions[module].can_create),
      can_edit: Boolean(permissions[module].can_edit),
      can_delete: Boolean(permissions[module].can_delete),
      can_view: Boolean(permissions[module].can_view)
    }));

    console.log('Returning permissions array:', permissionsArray);
    res.json({ data: permissionsArray });
  } catch (err) {
    console.error('Error fetching role permissions:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  }
};

// POST - Update permissions for a role (store as JSON)
export const updatePermissions = async (req, res) => {
  try {
    const { roleId, permissions } = req.body;

    console.log('=== updatePermissions DEBUG ===');
    console.log('roleId:', roleId);
    console.log('permissions:', permissions);

    if (!roleId || !Array.isArray(permissions)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Check if role exists
    const [role] = await pool.execute(
      'SELECT id FROM roles WHERE id = ?',
      [roleId]
    );

    if (role.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Convert array to JSON object format
    const permissionsObject = {};
    permissions.forEach(perm => {
      permissionsObject[perm.module] = {
        can_create: Boolean(perm.can_create),
        can_edit: Boolean(perm.can_edit),
        can_delete: Boolean(perm.can_delete),
        can_view: Boolean(perm.can_view)
      };
    });

    console.log('Permissions object to save:', permissionsObject);

    // Update role with new permissions
    await pool.execute(
      'UPDATE roles SET permissions = ? WHERE id = ?',
      [JSON.stringify(permissionsObject), roleId]
    );

    res.json({ message: 'Permissions updated successfully' });
  } catch (err) {
    console.error('Error updating permissions:', err);
    res.status(500).json({ error: 'Internal server error' });
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
    results.forEach(row => {
      if (!permissionsByRole[row.role_id]) {
        permissionsByRole[row.role_id] = {
          role_id: row.role_id,
          role_name: row.role_name,
          permissions: []
        };
      }
      if (row.module) {
        permissionsByRole[row.role_id].permissions.push({
          module: row.module,
          can_create: Boolean(row.can_create),
          can_edit: Boolean(row.can_edit),
          can_delete: Boolean(row.can_delete),
          can_view: Boolean(row.can_view)
        });
      }
    });

    res.json(Object.values(permissionsByRole));
  } catch (err) {
    console.error('Error fetching permissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export { upload };