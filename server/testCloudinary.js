import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary Connection...');

try {
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary Connection Successful:', result);
    process.exit(0);
} catch (error) {
    console.error('❌ Cloudinary Connection Failed:');
    console.error('Error Code:', error.http_code);
    console.error('Error Message:', error.message);
    process.exit(1);
}
