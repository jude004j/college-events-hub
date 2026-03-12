import Event from '../models/Event.js';
import Hub from '../models/Hub.js';
import SubHub from '../models/SubHub.js';

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, images, hub, subHub, hubId, subHubId, registerLink } = req.body;

        let finalHubId = hubId;
        let finalSubHubId = subHubId;

        // If hub name is provided instead of ID (common in decoupled frontend)
        if (!finalHubId && hub) {
            let foundHub = await Hub.findOne({ name: hub });
            if (!foundHub) {
                foundHub = await Hub.create({ name: hub, description: `${hub} Hub` });
            }
            finalHubId = foundHub._id;
        }

        // If subHub name is provided instead of ID
        if (!finalSubHubId && subHub) {
            let foundSubHub = await SubHub.findOne({ name: subHub });
            if (!foundSubHub) {
                foundSubHub = await SubHub.create({
                    name: subHub,
                    hubId: finalHubId,
                    description: `${subHub} Sub-Hub`
                });
            }
            finalSubHubId = foundSubHub._id;
        }

        // Ensure we have IDs at this point
        if (!finalHubId || !finalSubHubId) {
            return res.status(400).json({ message: "Hub and SubHub are required (name or ID)" });
        }

        // Handle images: ensure it's an array for the model
        let imageArray = [];
        if (Array.isArray(images)) {
            imageArray = images;
        } else if (typeof images === 'string' && images.trim() !== '') {
            imageArray = [images];
        }

        const event = new Event({
            title,
            description,
            date,
            images: imageArray,
            hubId: finalHubId,
            subHubId: finalSubHubId,
            createdBy: req.admin._id,
            registerLink,
            status: 'published'
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Create Event Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('hubId', 'name')
            .populate('subHubId', 'name')
            .populate('createdBy', 'email')
            .sort({ createdAt: -1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get events by hub
// @route   GET /api/events/hub/:hubId
// @access  Public
export const getEventsByHub = async (req, res) => {
    try {
        const events = await Event.find({ hubId: req.params.hubId })
            .populate('hubId', 'name')
            .populate('subHubId', 'name')
            .populate('createdBy', 'email')
            .sort({ createdAt: -1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = req.body.title || event.title;
            event.description = req.body.description || event.description;
            event.date = req.body.date || event.date;
            event.images = req.body.images || event.images;
            event.hubId = req.body.hubId || event.hubId;
            event.subHubId = req.body.subHubId || event.subHubId;
            event.registerLink = req.body.registerLink || event.registerLink;
            event.status = req.body.status || event.status;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
