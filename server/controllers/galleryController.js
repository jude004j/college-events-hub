import Gallery from '../models/Gallery.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery images', error: error.message });
    }
};

// @desc    Add images to gallery
// @route   POST /api/gallery
// @access  Admin
export const addGalleryImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const images = req.files.map(file => ({
            imageUrl: file.path,
            caption: req.body.caption || '' // Simple caption for now, can be improved
        }));

        const savedImages = await Gallery.insertMany(images);
        res.status(201).json(savedImages);
    } catch (error) {
        res.status(500).json({ message: 'Error adding gallery images', error: error.message });
    }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Admin
export const deleteGalleryImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image removed from gallery' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery image', error: error.message });
    }
};
