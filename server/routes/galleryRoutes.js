import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import {
    getGalleryImages,
    addGalleryImages,
    deleteGalleryImage
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// Public route
router.get('/', getGalleryImages);

// Admin routes
router.post('/', protectAdmin, upload.array('images', 10), addGalleryImages);
router.delete('/:id', protectAdmin, deleteGalleryImage);

export default router;
