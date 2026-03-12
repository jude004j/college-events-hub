import express from 'express';
import { getAllHubs, getSubHubsByHub } from '../controllers/hubController.js';

const router = express.Router();

router.get('/', getAllHubs);
router.get('/:hubId/subhubs', getSubHubsByHub);

export default router;
