import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import hubRoutes from './routes/hubRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import { protectAdmin } from './middleware/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: "*", // Temporarily allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Serve static files (Legacy local uploads - removed for Cloudinary)
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/hubs', hubRoutes);
app.use('/api/upload-image', uploadRoutes);
app.use('/api/gallery', galleryRoutes);

// Protected Admin Routes (Placeholders for Step 4 demonstration)
app.get('/api/admin/dashboard', protectAdmin, (req, res) => {
    res.json({ message: 'Welcome to the protected Admin Dashboard', admin: req.admin });
});

app.get('/api/admin/manage-events', protectAdmin, (req, res) => {
    res.json({ message: 'Accessing Manage Events...' });
});

app.get('/api/admin/add-event', protectAdmin, (req, res) => {
    res.json({ message: 'Accessing Add Event form...' });
});

// Main Test Route
app.get('/', (req, res) => {
    res.send('College Events Hub API running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
