const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    videoId: {
        type: String,
        unique: true,
    },
    publishedAt: Date,
    channelId: String,
    title: String,
    description: String,
    thumbnails: Object,
    channelTitle: String,
    tags: Array,
    categoryId: String,
    liveBroadcastContent: String,
    defaultLanguage: String,
    localized: Object,
    contentDetails: Object,
    statistics: Object
}, { timestamps: true });
videoSchema.index({ videoId: 1 });
// videoSchema.index({ username: 1, email: 1 });

const Video = mongoose.model('video', videoSchema);

module.exports = Video;
