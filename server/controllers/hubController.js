import Hub from '../models/Hub.js';
import SubHub from '../models/SubHub.js';

// @desc    Get all hubs
// @route   GET /api/hubs
// @access  Public
export const getAllHubs = async (req, res) => {
    try {
        const hubs = await Hub.find().sort({ name: 1 });
        res.json(hubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get subhubs by hub
// @route   GET /api/hubs/:hubId/subhubs
// @access  Public
export const getSubHubsByHub = async (req, res) => {
    try {
        const subHubs = await SubHub.find({ hubId: req.params.hubId }).sort({ name: 1 });
        res.json(subHubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
