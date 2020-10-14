const express = require('express');
const router = express.Router();

const {admin} = require('../authentication/firebase');
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_CODE_UNAUTHORIZED} = require('../constant/constant');

const {logoutController} = require("../controllers/logoutController");
const {getUsers} = require("../controllers/userController");
const YoutubeController = require("../controllers/youtubeController");

router.get('/users', authentication,  getUsers);

router.get('/comments-by-video-id', authentication,  YoutubeController.getCommentsByVideoId);

router.get('/logout', logoutController);

async function authentication(req, res, next) {
    try {
        try {
            const sessionCookie = req.cookies.session || '';
            const decodedClaims = await admin.auth().verifySessionCookie( sessionCookie, true /** checkRevoked */);
            next()
        } catch (e) {
            res.json({
                status: RESPONSE_STATUS_FAIL,
                statusCode: RESPONSE_STATUS_CODE_UNAUTHORIZED,
                message: e.message
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = router;
