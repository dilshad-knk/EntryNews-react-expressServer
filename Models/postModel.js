import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
