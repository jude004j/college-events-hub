import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find admin by email
        const admin = await Admin.findOne({ email });

        // 2. If admin does NOT exist → return 401 Unauthorized
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);

        // 4. If password mismatch → return 401 Unauthorized
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 5. If valid → generate JWT token
        // Include adminId and email in payload
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Response Rules: return JWT token and admin email
        res.json({
            token: token,
            email: admin.email
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
