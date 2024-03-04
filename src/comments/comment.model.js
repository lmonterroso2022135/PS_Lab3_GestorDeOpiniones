import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
});



export default mongoose.model('Comment', CommentSchema);