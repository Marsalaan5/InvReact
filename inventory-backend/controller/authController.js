// import express from 'express';
// import pool from '../db.js'; 
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import crypto from 'crypto';


// dotenv.config();

// // Signup
// // exports.signup = async (req, res) => {
// //     const { name, email, password, role_id } = req.body;

// //     try {
// //         const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
// //         if (user.length) return res.status(400).json({ message: "Email already exists" });

// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         await pool.execute(
// //             "INSERT INTO users (name, email, password, role_id) VALUES (?,?,?,?)",
// //             [name, email, hashedPassword, role_id]
// //         );

// //         res.json({ message: "User registered successfully" });
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // };


// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
    
//         const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
//         if (user.length) return res.status(400).json({ message: "Email already exists" });

    
//         const hashedPassword = await bcrypt.hash(password, 10);

       
//         await pool.execute(
//             "INSERT INTO users (name, email, password, role_id) VALUES (?,?,?,?)",
//             [name, email, hashedPassword, 3]
//         );

//         res.json({ message: "User registered successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



// exports.signin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
//         if (!user.length) return res.status(404).json({ message: "User not found" });

//         const validPassword = await bcrypt.compare(password, user[0].password);
//         if (!validPassword) return res.status(400).json({ message: "Invalid password" });

//         const roleId = user.role_id;

//         const token = jwt.sign({ id: user[0].id,
//             email: user[0].email,
//         role_id: user[0].role_id,
//          }, process.env.JWT_SECRET, { expiresIn: "1d" });

//         res.json({ token, user: { id: user[0].id, name: user[0].name, role_id: user[0].role_id } });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



// // exports.signin = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const [user] = await pool.execute(
// //       "SELECT id, email, name, role_id, permissions, password FROM users WHERE email = ?",
// //       [email]
// //     );

// //     if (!user.length) return res.status(404).json({ message: "User not found" });

// //     const validPassword = await bcrypt.compare(password, user[0].password);
// //     if (!validPassword) return res.status(400).json({ message: "Invalid password" });

   
// //     let permissions = {};
// //     if (user[0].permissions) {
// //       try {
// //         permissions = JSON.parse(user[0].permissions); 
// //       } catch (err) {
// //         permissions = {}; 
// //       }
// //     }

  
// //     const token = jwt.sign(
// //       {
// //         id: user[0].id,
// //         email: user[0].email,
// //         role_id: user[0].role_id,
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );


// //     res.json({
// //       token,
// //       user: {
// //         id: user[0].id,
// //         name: user[0].name,
// //         role_id: user[0].role_id,
// //         permissions,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Signin error:", err);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };



// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
//         if (!user.length) return res.status(404).json({ message: "User not found" });

//         const resetToken = crypto.randomBytes(32).toString("hex");
//         await pool.execute("UPDATE users SET reset_token = ? WHERE email = ?", [resetToken, email]);

      
//         res.json({ message: "Password reset token generated", resetToken });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// exports.resetPassword = async (req, res) => {
//     const { resetToken, newPassword } = req.body;

//     try {
//         const [user] = await pool.execute("SELECT * FROM users WHERE reset_token = ?", [resetToken]);
//         if (!user.length) return res.status(400).json({ message: "Invalid token" });

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         await pool.execute("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [hashedPassword, resetToken]);

//         res.json({ message: "Password reset successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



import express from 'express';
import pool from '../db.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();


// Signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length) return res.status(400).json({ message: "Email already exists" });

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await pool.execute(
            "INSERT INTO users (name, email, password, role_id) VALUES (?,?,?,?)",
            [name, email, hashedPassword, 3]  // Default role_id is 3
        );

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Signin
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (!user.length) return res.status(404).json({ message: "User not found" });

        // Check if password matches
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { 
                id: user[0].id,
                email: user[0].email,
                role_id: user[0].role_id
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.json({
            token, 
            user: { 
                id: user[0].id, 
                name: user[0].name, 
                role_id: user[0].role_id 
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (!user.length) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        await pool.execute("UPDATE users SET reset_token = ? WHERE email = ?", [resetToken, email]);

        res.json({ message: "Password reset token generated", resetToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const [user] = await pool.execute("SELECT * FROM users WHERE reset_token = ?", [resetToken]);
        if (!user.length) return res.status(400).json({ message: "Invalid token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.execute("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [hashedPassword, resetToken]);

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
