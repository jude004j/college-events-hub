import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventsByHub,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protectAdmin, createEvent)
    .get(getAllEvents);

router.get('/hub/:hubId', getEventsByHub);

router.route('/:id')
    .put(protectAdmin, updateEvent)
    .delete(protectAdmin, deleteEvent);

export default router;
