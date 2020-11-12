const Comment = require("../models/Comment");
const Video = require("../models/Video");
const YoutubeService = require("../services/YoutubeService");
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_CODE_UNAUTHORIZED} = require("../constant/constant");


const YoutubeController = {
    checkVideoExist: async function(req, res, next) {
        return await Video.exists({videoId: req.query.videoId});
    },

    findVideoById: async function(req, res, next) {
        const result = await Video.findOne({id: req.query.videoId});
        return res.json({
            status: RESPONSE_STATUS_SUCCESS,
            data: result
        })
    },

    persistVideoAndComments: async function (req, res, next) {
        // TODO việc này phải dc chạy trong 1 job queue, khi hoan thanh fai bao cho user wa socket
        const videoId = req.query.videoId;
        await YoutubeService.persistCommentsFromYoutube(videoId);
        // await Promise.all([YoutubeService.persistVideoFromYoutube(videoId), YoutubeService.persistCommentsFromYoutube(videoId)]);
    },
}

module.exports = YoutubeController;
