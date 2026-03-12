import mongoose from 'mongoose';

const hubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    backgroundImage: {
        type: String // store image URL only
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Hub = mongoose.model('Hub', hubSchema);

export default Hub;
