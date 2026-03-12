import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the same directory as this script
dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        const admins = [
            { email: 'admin1@college.edu', password: 'admin123', role: 'super' },
            { email: 'admin2@college.edu', password: 'admin123', role: 'admin' },
            { email: 'admin3@college.edu', password: 'admin123', role: 'admin' }
        ];

        for (const adminData of admins) {
            const existing = await Admin.findOne({ email: adminData.email });
            if (!existing) {
                const hashedPassword = await bcrypt.hash(adminData.password, 10);
                await Admin.create({
                    email: adminData.email,
                    password: hashedPassword,
                    role: adminData.role
                });
                console.log(`Created: ${adminData.email}`);
            } else {
                console.log(`Skipped existing: ${adminData.email}`);
            }
        }

        console.log('Admin seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedAdmin();
