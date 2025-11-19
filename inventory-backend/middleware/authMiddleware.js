
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



import pool from '../db.js';
import jwt from 'jsonwebtoken';

export function isAdmin(req, res, next) {
  if (req.user.role !== "Super Admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Super Admins only." });
  }
  next();
}
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Token missing" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await pool.execute(
      "SELECT id, email, username, role_id FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    
    const [roleRows] = await pool.execute(
      "SELECT name, permissions FROM roles WHERE id = ?",
      [user.role_id]
    );

    let roleName = "user";
    let permissions = {};

    if (roleRows.length > 0) {
      roleName = roleRows[0].name;
      try {
        permissions = JSON.parse(roleRows[0].permissions || "{}");
      } catch {
        permissions = {};
      }
    }

    // SET USER WITH CORRECT ROLE NAME
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: roleName,  
      role_id: user.role_id,
      permissions
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid token" });
  }
};
