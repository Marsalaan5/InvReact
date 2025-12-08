
// const jwt = require("jsonwebtoken");
// const pool = require("../db");

// import pool from '../db.js';
// import jwt from 'jsonwebtoken';

// export function isAdmin(req, res, next) {
//   if (req.user.role !== "Super Admin") {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Super Admins only." });
//   }
//   next();
// }

// export const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
//       decoded.id,
//     ]);

//     if (rows.length === 0)
//       return res.status(401).json({ message: "User not found" });

//     const user = rows[0];

//     let permissions = {};
//     if (user.role) {
//       const [roleRows] = await pool.execute(
//         "SELECT * FROM roles WHERE name = ?",
//         [user.role]
//       );
//       if (roleRows.length > 0) {
//         try {
//           permissions = JSON.parse(roleRows[0].permissions || "{}");
//         } catch {
//           permissions = {};
//         }
//       }
//     }

//     req.user = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       permissions,
//     };

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ message: "Invalid token" });
//   }
// };



// import pool from '../db.js';
// import jwt from 'jsonwebtoken';

// export function isAdmin(req, res, next) {
//   if (req.user.role !== "Super Admin") {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Super Admins only." });
//   }
//   next();
// }



// export const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  
//   if (!token) return res.status(401).json({ message: "Token missing" });
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const [rows] = await pool.execute(
//       "SELECT id, email, username, role_id FROM users WHERE id = ?",
//       [decoded.id]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const user = rows[0];

    
//     const [roleRows] = await pool.execute(
//       "SELECT name, permissions FROM roles WHERE id = ?",
//       [user.role_id]
//     );

//     let roleName = "user";
//     let permissions = {};

//     if (roleRows.length > 0) {
//       roleName = roleRows[0].name;
//       try {
//         permissions = JSON.parse(roleRows[0].permissions || "{}");
//       } catch {
//         permissions = {};
//       }
//     }

//     // SET USER WITH CORRECT ROLE NAME
//     req.user = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: roleName,  
//       role_id: user.role_id,
//       permissions
//     };

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ message: "Invalid token" });
//   }
// };





import pool from '../db.js';
import jwt from 'jsonwebtoken';

/**
 * Middleware to check if user is Super Admin
 */
export function isAdmin(req, res, next) {
  if (req.user?.role !== "Super Admin") {
    return res.status(403).json({ 
      message: "Access denied. Super Admins only.",
      userRole: req.user?.role 
    });
  }
  next();
}

/**
 * Middleware to authenticate JWT token and attach user info
 */
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const [userRows] = await pool.execute(
      "SELECT id, email, username, role_id FROM users WHERE id = ?",
      [decoded.id]
    );
    
    if (userRows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    
    const user = userRows[0];
    
    // Get role information
    const [roleRows] = await pool.execute(
      "SELECT name, permissions FROM roles WHERE id = ?",
      [user.role_id]
    );
    
    let roleName = "User"; // Default fallback
    let permissions = {};
    
    if (roleRows.length > 0) {
      roleName = roleRows[0].name;
      try {
        permissions = JSON.parse(roleRows[0].permissions || "{}");
      } catch (parseError) {
        console.error("Error parsing permissions:", parseError);
        permissions = {};
      }
    }
    
    // Attach complete user info to request
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: roleName,   
      role_id: user.role_id,
      role_name: roleName, 
      permissions
    };
    
    next();
  } catch (err) {
    console.error("Token authentication error:", err);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Invalid token" });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: "Token expired" });
    }
    
    res.status(403).json({ message: "Authentication failed" });
  }
};

/**
 * Middleware to check minimum role requirement
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const userLevel = getRoleLevel(userRole);
    const requiredLevel = getRoleLevel(requiredRole);
    
    if (userLevel < requiredLevel) {
      return res.status(403).json({ 
        message: `Access denied. Minimum role required: ${requiredRole}`,
        currentRole: userRole
      });
    }
    
    next();
  };
};




// import pool from '../db.js';
// import jwt from 'jsonwebtoken';

// /**
//  * Middleware to check if user is Super Admin
//  */
// export function isAdmin(req, res, next) {
//   if (req.user?.role !== "Super Admin") {
//     return res.status(403).json({ 
//       message: "Access denied. Super Admins only.",
//       userRole: req.user?.role 
//     });
//   }
//   next();
// }

// /**
//  * Middleware to authenticate JWT token and attach user info
//  */
// export const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  
//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Fetch user and role in a single query using a JOIN
//     const [userRows] = await pool.execute(
//       `SELECT u.id, u.email, u.username, u.role_id, r.name AS role, r.permissions 
//        FROM users u
//        LEFT JOIN roles r ON u.role_id = r.id
//        WHERE u.id = ?`,
//       [decoded.id]
//     );
    
//     if (userRows.length === 0) {
//       return res.status(401).json({ message: "User not found" });
//     }
    
//     const user = userRows[0];
    
//     let permissions = {};
//     if (user.permissions) {
//       try {
//         permissions = JSON.parse(user.permissions);
//       } catch (parseError) {
//         console.error("Error parsing permissions:", parseError);
//         permissions = {}; // Default to empty permissions if parse fails
//       }
//     }
    
//     // Attach complete user info to request
//     req.user = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role,  // Role from the database
//       role_id: user.role_id,
//       permissions
//     };
    
//     next();
//   } catch (err) {
//     console.error("Token authentication error:", err);
    
//     if (err.name === 'JsonWebTokenError') {
//       return res.status(403).json({ message: "Invalid token" });
//     } else if (err.name === 'TokenExpiredError') {
//       return res.status(403).json({ message: "Token expired" });
//     }
    
//     res.status(403).json({ message: "Authentication failed" });
//   }
// };

// /**
//  * Middleware to check minimum role requirement
//  */
// export const requireRole = (requiredRole) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
    
//     if (!userRole) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
    
//     const userLevel = getRoleLevel(userRole);
//     const requiredLevel = getRoleLevel(requiredRole);
    
//     if (userLevel < requiredLevel) {
//       return res.status(403).json({ 
//         message: `Access denied. Minimum role required: ${requiredRole}`,
//         currentRole: userRole
//       });
//     }
    
//     next();
//   };
// };

// /**
//  * Helper function to get role level
//  */
// const roleLevels = {
//   'Super Admin': 3,
//   'Admin': 2,
//   'User': 1,
// };

// const getRoleLevel = (role) => roleLevels[role] || 0; // Default to level 0 if role is undefined
