import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

// POST /api/upload-image/
// Uploads up to 3 images to Cloudinary and returns their secure URLs
router.post('/', upload.array('images', 3), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // multer-storage-cloudinary provides the Cloudinary URL in 'path' or 'secure_url'
        const imageUrls = req.files.map(file => file.path);

        res.json({ imageUrls });
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Error uploading to Cloudinary', error: error.message });
    }
});

export default router;
