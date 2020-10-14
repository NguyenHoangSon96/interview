const {google} = require('googleapis');
const Comment = require('../models/Comment');

const YoutubeService = {
    youtube: google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY || ''
    }),

    getCommentsByVideoId: async function (videoId) {
        let results = [];

        const comments = await Comment.find({videoId})
                                      .sort({likeCount: -1})
                                      .select('textOriginal textDisplay authorDisplayName likeCount authorProfileImageUrl commentPublishedAt commentUpdatedAt')
                                      .lean();
        if (comments && comments.length > 0) {
            results = comments
        } else {
            await this.persitCommentsFromYoutube(videoId);
            // TODO gui socket cho client khi xog
        }
        return results;
    },

    persitCommentsFromYoutube: async function (videoId) {
        let nextPageToken;

        do {
            const params = {part: 'snippet', maxResults: 100, pageToken:  nextPageToken ? nextPageToken : undefined, videoId,};
            const response = await this.youtube.commentThreads.list(params);
            const items = response.data.items;
            if (!items) return;
            const comments = items.map(item => (
                {
                    commentId: item.id,
                    canReply: item.snippet.canReply,
                    isPublic: item.snippet.isPublic,
                    totalReplyCount: item.snippet.totalReplyCount,
                    videoId: item.snippet.videoId,
                    authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
                    textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
                    authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
                    textOriginal: item.snippet.topLevelComment.snippet.textOriginal,
                    authorChannelId: item.snippet.topLevelComment.snippet.authorChannelId.value,
                    authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
                    likeCount: item.snippet.topLevelComment.snippet.likeCount,
                    commentPublishedAt: item.snippet.topLevelComment.snippet.publishedAt,
                    commentUpdatedAt: item.snippet.topLevelComment.snippet.updatedAt,
                    viewerRating: item.snippet.topLevelComment.snippet.viewerRating,
                    canRate: item.snippet.topLevelComment.snippet.canRate,
                }
            ));
            await Comment.insertMany(comments);
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
    }
}

module.exports = YoutubeService;
