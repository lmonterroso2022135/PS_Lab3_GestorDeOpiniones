import mongoose from 'mongoose';

const PublicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: [] 
    },
    state: {
        type: Boolean,
        default: true
    }

});

export default mongoose.model('Publication', PublicationSchema);
