import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hub from './models/Hub.js';
import SubHub from './models/SubHub.js';

dotenv.config();

const seedHubs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for hub seeding...');

        // Clear existing hubs and subhubs
        await Hub.deleteMany({});
        await SubHub.deleteMany({});

        const hubsData = [
            { name: "BlackOps", description: "Cybersecurity, ethical hacking, and defense operations." },
            { name: "Visionary Visions", description: "AR/VR experiences, computer vision, and future technology." },
            { name: "Tech Tales", description: "Tech storytelling, blogging, and technical content creation." },
            { name: "Tech Fusion", description: "Cross-disciplinary tech projects combining IoT, hardware, and software." },
            { name: "Wonder Web", description: "Web development, frontend frameworks, and full-stack architecture." },
            { name: "Geek Wiz", description: "Algorithms, competitive programming, and deep computer science." },
            { name: "Hot Bait Hub", description: "Digital marketing, SEO, and tech entrepreneurship strategies." },
            { name: "Pixel Tech", description: "Graphics design, 3D modeling, and game art." },
            { name: "Tech Titan", description: "System architecture, cloud computing, and DevOps." },
            { name: "Skill Aura", description: "Soft skills, leadership in tech, and career development." }
        ];

        for (const hubData of hubsData) {
            const hub = new Hub(hubData);
            const savedHub = await hub.save();
            console.log(`Hub created: ${savedHub.name}`);

            // Create a default subhub for each hub
            const subHub = new SubHub({
                name: `${savedHub.name} Main`,
                description: `Primary sub-hub for ${savedHub.name}`,
                hubId: savedHub._id
            });
            await subHub.save();
            console.log(`SubHub created for ${savedHub.name}`);
        }

        console.log('Hubs and SubHubs Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedHubs();
