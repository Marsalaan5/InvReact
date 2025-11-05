// import express from 'express';
// import pool from '../db.js';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// dotenv.config();

// const router = express.Router();


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = 'uploads/avatars';

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
  
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });


// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'));
//   }
// };


// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter: fileFilter
// });


// //users api 

// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields (name, email, password) are required" });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ message: "Password must be at least 6 characters long" });
//   }

//   try {
//     const [existingUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
//     if (existingUser.length) return res.status(400).json({ message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await pool.execute(
//       "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
//       [name, email, hashedPassword, 3]
//     );

//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         id: result.insertId,
//         name: name,
//         email: email,
//         role_id: 3,
//       }
//     });
//   } catch (err) {
//     console.error("Error in user creation:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getUser = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   if (isNaN(page) || page < 1) {
//     return res.status(400).json({ message: "Invalid page number. Must be a positive integer." });
//   }
//   if (isNaN(limit) || limit < 1) {
//     return res.status(400).json({ message: "Invalid limit. Must be a positive integer." });
//   }

//   try {
//     const offset = (page - 1) * limit;

//     const [users] = await pool.execute(
//       "SELECT id, name, email, phone, username, avatar, role_id, created_at, updated_at FROM users LIMIT ? OFFSET ?",
//       [Number(limit), Number(offset)]
//     );

//     const [totalUsers] = await pool.execute("SELECT COUNT(*) AS count FROM users");
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
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

// export const getUserById = async (req, res) => {
//   const userId = req.params.id;

//   if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
//     return res.status(400).json({ message: "Invalid user ID. ID must be a positive integer." });
//   }

//   try {
//     const [user] = await pool.execute(
//       "SELECT id, name, email, phone, username, avatar, role_id, created_at, updated_at FROM users WHERE id = ?",
//       [userId]
//     );

//     if (user.length === 0) {
//       return res.status(404).json({ message: `User with ID ${userId} not found` });
//     }

//     res.json(user[0]);
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

// export const editUserById = (req, res) => {
//   upload.single('avatar')(req, res, async (err) => {
//     if (err) {
//       console.error("File upload error:", err);
//       return res.status(400).json({ message: "File upload failed", error: err.message });
//     }

//     const { name, email, phone, username } = req.body;
//     const userId = req.params.id;

//     console.log("=== Update User Request ===");
//     console.log("User ID:", userId);
//     console.log("Body:", req.body);
//     console.log("File:", req.file);

//     try {
    
//       if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
//         return res.status(400).json({ message: "Invalid user ID" });
//       }

    
//       const [existingUser] = await pool.execute(
//         "SELECT * FROM users WHERE id = ?",
//         [userId]
//       );

//       if (existingUser.length === 0) {
//         return res.status(404).json({ message: "User not found" });
//       }

    
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

  
//       if (req.file) {
      
//         const normalizedPath = req.file.path.replace(/\\/g, '/');
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
//         "SELECT id, name, email, phone, username, avatar, role_id FROM users WHERE id = ?",
//         [userId]
//       );

//       res.json({
//         message: "User updated successfully",
//         user: updatedUser[0]
//       });
//     } catch (err) {
//       console.error("Error updating user:", err);
//       res.status(500).json({ 
//         message: "Internal Server Error", 
//         error: err.message 
//       });
//     }
//   });
// };

// export const deleteUserById = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

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










// //roles api 

// export const createRole = async (req, res) => {
//   const { name, permission } = req.body;

//   if (!name || !permission) {
//     return res.status(400).json({ message: "Role name and permissions are required" });
//   }

//   try {
//     const [existingRole] = await pool.execute("SELECT * FROM roles WHERE name = ?", [name]);
//     if (existingRole.length) return res.status(400).json({ message: "Role already exists" });

//     const [result] = await pool.execute(
//       "INSERT INTO roles (name, permission) VALUES (?, ?)",
//       [name, permission]
//     );

//     res.status(201).json({
//       message: "Role created successfully",
//       role: {
//         id: result.insertId,
//         name,
//         permission,
//       }
//     });
//   } catch (err) {
//     console.error("Error creating role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export const getRoles = async (req, res) => {
//   try {
//     const [roles] = await pool.execute("SELECT id, name, permission FROM roles");
//     res.json({ roles });
//   } catch (err) {
//     console.error("Error fetching roles:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
 


// export const getRoleById = async (req, res) => {
//   const roleId = req.params.id;

//   if (!Number.isInteger(Number(roleId)) || Number(roleId) <= 0) {
//     return res.status(400).json({ message: "Invalid role ID" });
//   }

//   try {
//     const [role] = await pool.execute(
//       "SELECT id, name, permission FROM roles WHERE id = ?",
//       [roleId]
//     );

//     if (role.length === 0) {
//       return res.status(404).json({ message: `Role with ID ${roleId} not found` });
//     }

//     res.json(role[0]);
//   } catch (err) {
//     console.error("Error fetching role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// export const updateRoleById = async (req, res) => {
//   const roleId = req.params.id;
//   const { name, permission } = req.body;

//   if (!name || !description) {
//     return res.status(400).json({ message: "Role name and permissions are required" });
//   }

//   try {
//     const [existingRole] = await pool.execute("SELECT * FROM roles WHERE id = ?", [roleId]);
//     if (existingRole.length === 0) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     await pool.execute(
//       "UPDATE roles SET name = ?, permission = ? WHERE id = ?",
//       [name, description, roleId]
//     );

//     const [updatedRole] = await pool.execute(
//       "SELECT id, name, permission FROM roles WHERE id = ?",
//       [roleId]
//     );

//     res.json({
//       message: "Role updated successfully",
//       role: updatedRole[0]
//     });
//   } catch (err) {
//     console.error("Error updating role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// export const deleteRoleById = async (req, res) => {
//   const roleId = req.params.id;

//   try {
//     const [role] = await pool.execute("SELECT * FROM roles WHERE id = ?", [roleId]);

//     if (role.length === 0) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     await pool.execute("DELETE FROM roles WHERE id = ?", [roleId]);

//     res.json({ message: "Role deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting role:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export { upload };





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



// ============= USERS API =============

// export const createUser = async (req, res) => {
//   const { name, email, password, phone, username, role_id } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Name, email, and password are required" });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ message: "Password must be at least 6 characters long" });
//   }

//   try {
//     const [existingUser] = await pool.execute(
//       "SELECT * FROM users WHERE email = ? OR username = ?", 
//       [email, username || email]
//     );
//     if (existingUser.length) {
//       return res.status(400).json({ message: "Email or username already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await pool.execute(
//       "INSERT INTO users (name, email, password, phone, username, role_id) VALUES (?, ?, ?, ?, ?, ?)",
//       [name, email, hashedPassword, phone || null, username || email, role_id || 3]
//     );

//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         id: result.insertId,
//         name,
//         email,
//         phone,
//         username: username || email,
//         role_id: role_id || 3,
//       }
//     });
//   } catch (err) {
//     console.error("Error in user creation:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };





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


// ============= ROLES API =============

export const createRole = async (req, res) => {
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).json({ message: "Role name and permissions are required" });
  }


  let permissionJson;
  try {
    permissionJson = typeof permissions === 'string' ? permissions : JSON.stringify(permissions);
    JSON.parse(permissionJson);
  } catch (err) {
    return res.status(400).json({ message: "Permission must be valid JSON" });
  }

  try {
    const [existingRole] = await pool.execute("SELECT * FROM roles WHERE name = ?", [name]);
    if (existingRole.length) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const [result] = await pool.execute(
      "INSERT INTO roles (name, permissions) VALUES (?, ?)",
      [name, permissionJson]
    );

    res.status(201).json({
      message: "Role created successfully",
      role: {
        id: result.insertId,
        name,
        permissions: JSON.parse(permissionJson),
      }
    });
  } catch (err) {
    console.error("Error creating role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const [roles] = await pool.execute("SELECT id, name, permissions FROM roles");
    
  
    const parsedRoles = roles.map(role => ({
      ...role,
      permissions: typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions
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
      "SELECT id, name, permissions FROM roles WHERE id = ?",
      [roleId]
    );

    if (role.length === 0) {
      return res.status(404).json({ message: `Role with ID ${roleId} not found` });
    }

    const parsedRole = {
      ...role[0],
      permissions: typeof role[0].permissions === 'string' ? JSON.parse(role[0].permissions) : role[0].permissions
    };

    res.json(parsedRole);
  } catch (err) {
    console.error("Error fetching role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRoleById = async (req, res) => {
  const roleId = req.params.id;
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).json({ message: "Role name and permissions are required" });
  }

  
  let permissionJson;
  try {
    permissionJson = typeof permissions === 'string' ? permissions : JSON.stringify(permissions);
    JSON.parse(permissionJson);
  } catch (err) {
    return res.status(400).json({ message: "Permission must be valid JSON" });
  }

  try {
    const [existingRole] = await pool.execute("SELECT * FROM roles WHERE id = ?", [roleId]);
    if (existingRole.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

  
    const [duplicate] = await pool.execute(
      "SELECT * FROM roles WHERE name = ? AND id != ?",
      [name, roleId]
    );
    if (duplicate.length > 0) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    await pool.execute(
      "UPDATE roles SET name = ?, permissions = ? WHERE id = ?",
      [name, permissionJson, roleId]
    );

    const [updatedRole] = await pool.execute(
      "SELECT id, name, permissions FROM roles WHERE id = ?",
      [roleId]
    );

    const parsedRole = {
      ...updatedRole[0],
      permissions: JSON.parse(updatedRole[0].permissions)
    };

    res.json({
      message: "Role updated successfully",
      role: parsedRole
    });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const [role] = await pool.execute("SELECT * FROM roles WHERE id = ?", [roleId]);

    if (role.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }


    const [usersWithRole] = await pool.execute(
      "SELECT COUNT(*) as count FROM users WHERE role_id = ?",
      [roleId]
    );

    if (usersWithRole[0].count > 0) {
      return res.status(400).json({ 
        message: `Cannot delete role. ${usersWithRole[0].count} user(s) are assigned to this role.` 
      });
    }

    await pool.execute("DELETE FROM roles WHERE id = ?", [roleId]);

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { upload };