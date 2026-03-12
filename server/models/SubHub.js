import mongoose from 'mongoose';

const subHubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    hubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hub",
        required: true
    },
    backgroundStyle: {
        type: String // animation name or gradient identifier
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

const SubHub = mongoose.model('SubHub', subHubSchema);

export default SubHub;
