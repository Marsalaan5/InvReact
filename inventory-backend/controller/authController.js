
import express from 'express';
import pool from '../db.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { validate } from 'uuid';
import { signupSchema } from '../validator/validator.js';
// import { signupSchema,signinSchema,forgotPasswordSchema,resetPasswordSchema } from '../validator/validator.js';

dotenv.config();


// const validate = (schema,data,res) =>{
//     const {error} = schema.validate(data)
//     if(error){
//         return res.status(400).json({message:error.details[0].message})
//     }
// }


// Signup
export const signup = async (req, res) => {

    // const validationError = validate(signupSchema,req.body,res)
    // if(validationError) return;

    const { name, email, password } = req.body;

    try {

        const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length) return res.status(400).json({ message: "Email already exists" });

    
        const hashedPassword = await bcrypt.hash(password, 10);

      
        await pool.execute(
            "INSERT INTO users (name, email, password, role_id) VALUES (?,?,?,?)",
            [name, email, hashedPassword, 3] 
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
        //  FIXED: Added u.warehouse_id to SELECT
        const [user] = await pool.execute(`
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.password, 
                u.role_id,
                u.warehouse_id,
                u.status,
                r.name as role_name,
                r.permissions,
                w.title as warehouse_name
            FROM users u
            LEFT JOIN roles r ON u.role_id = r.id
            LEFT JOIN warehouse w ON u.warehouse_id = w.id
            WHERE u.email = ?
        `, [email]);
        
        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User from DB:", {
            id: user[0].id,
            email: user[0].email,
            warehouse_id: user[0].warehouse_id,
            warehouse_name: user[0].warehouse_name
        });

        // Check if user is inactive
        if (user[0].status && user[0].status.trim().toLowerCase() === 'inactive') {
            return res.status(403).json({ 
                message: "Your account is inactive. Please contact support." 
            });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Parse permissions from JSON
        let permissions = {};
        try {
            if (user[0].permissions) {
                permissions = typeof user[0].permissions === 'string' 
                    ? JSON.parse(user[0].permissions) 
                    : user[0].permissions;
            }
        } catch (e) {
            console.error('Error parsing permissions:', e);
            permissions = {};
        }

        // FIXED: Include warehouse_id in JWT token
        const token = jwt.sign(
            { 
                id: user[0].id,
                email: user[0].email,
                role_id: user[0].role_id,
                role: user[0].role_name,
                status: user[0].status,
                warehouse_id: user[0].warehouse_id  // ✅ Added
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        // FIXED: Return complete user data with warehouse info
        res.json({
            token, 
            user: { 
                id: user[0].id, 
                name: user[0].name,
                email: user[0].email,
                role_id: user[0].role_id,
                role: user[0].role_name,
                roleName: user[0].role_name,
                status: user[0].status,
                warehouse_id: user[0].warehouse_id,      // ✅ Added
                warehouse_name: user[0].warehouse_name,  // ✅ Added
                permissions: permissions
            }
        });

        console.log("✅ Login successful. Warehouse:", user[0].warehouse_name);

    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Forgot Password
export const forgotPassword = async (req, res) => {

    // const validationError = validate(forgotPasswordSchema,req.body,res)
    // if (validationError) return;

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

    // const validationError = validate(resetPasswordSchema,req.body,res)
    // if(validationError) return;

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
