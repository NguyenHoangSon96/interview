const express = require('express');
const router = express.Router();
const {admin} = require('../authentication/firebase');
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_CODE_UNAUTHORIZED} = require('../constant/constant');

const {getUsers} = require("../controllers/userController");

router.get('/users', authentication,  getUsers);

async function authentication(req, res, next) {
    try {
        try {
            const sessionCookie = req.cookies.session || '';
            const decodedClaims = await admin.auth().verifySessionCookie( sessionCookie, true /** checkRevoked */);
            console.log(decodedClaims)
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
