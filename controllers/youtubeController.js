const Comment = require("../models/Comment");
const YoutubeService = require("../services/YoutubeService");
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_CODE_UNAUTHORIZED} = require("../constant/constant");


const YoutubeController = {
    getCommentsByVideoId: async (req, res, next) => {
        try {
            let { videoId } = req.query;
            const results = await YoutubeService.getCommentsByVideoId(videoId);

            return res.json({status: RESPONSE_STATUS_SUCCESS, data: results});
        } catch (e) {
            next(e)
        }
    }
}

module.exports = YoutubeController;
