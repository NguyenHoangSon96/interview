const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentId: {
        type: String,
        unique: true,
    },
    canReply: Boolean,
    isPublic: Boolean,
    totalReplyCount: Number,
    videoId: String,
    authorDisplayName: String,
    textDisplay: String,
    authorProfileImageUrl: String,
    textOriginal: String,
    authorChannelId: String,
    authorChannelUrl: String,
    likeCount: Number,
    viewerRating: String,
    canRate: Boolean,
    commentPublishedAt: Date,
    commentUpdatedAt: Date,
}, { timestamps: true });
commentSchema.index({ videoId: 1 });
// commentSchema.index({ username: 1, email: 1 });

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
