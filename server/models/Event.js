import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    images: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    },
    hubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hub",
        required: true
    },
    subHubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubHub",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    registerLink: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length <= 3;
}

const Event = mongoose.model('Event', eventSchema);

export default Event;
