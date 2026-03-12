import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hub from './models/Hub.js';
import SubHub from './models/SubHub.js';
import Event from './models/Event.js';
import Admin from './models/Admin.js';

dotenv.config();

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for event seeding...');

        // Clear existing events
        await Event.deleteMany({});

        const hubs = await Hub.find();
        const subHubs = await SubHub.find();
        const admin = await Admin.findOne({ email: 'admin@collegeevents.com' });

        if (!admin) {
            console.error('Admin not found. Please seed admin first.');
            process.exit(1);
        }

        const eventsData = [
            {
                title: 'BlackOps CTF Hackathon',
                description: 'The ultimate Capture The Flag experience for security enthusiasts.',
                date: new Date('2026-04-12'),
                images: ['/assets/event1.jpeg'],
                hubId: hubs.find(h => h.name === 'BlackOps')._id,
                subHubId: subHubs.find(s => s.name === 'BlackOps Main')._id,
                createdBy: admin._id,
                status: 'published'
            },
            {
                title: 'Visionary Art Expo',
                description: 'Showcasing the intersection of digital art and technology.',
                date: new Date('2026-03-22'),
                images: ['/assets/event2.jpeg'],
                hubId: hubs.find(h => h.name === 'Visionary Visions')._id,
                subHubId: subHubs.find(s => s.name === 'Visionary Visions Main')._id,
                createdBy: admin._id,
                status: 'published'
            },
            {
                title: 'Tech Tales Storyboarding',
                description: 'Learn how to weave narratives into technical design.',
                date: new Date('2026-03-30'),
                images: ['/assets/event3.jpeg'],
                hubId: hubs.find(h => h.name === 'Tech Tales')._id,
                subHubId: subHubs.find(s => s.name === 'Tech Tales Main')._id,
                createdBy: admin._id,
                status: 'published'
            }
        ];

        await Event.insertMany(eventsData);
        console.log('Events Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding events failed:', error);
        process.exit(1);
    }
};

seedEvents();
