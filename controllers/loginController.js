const User = require("../models/User");
const {getUsers} = require('../authentication/firebase');
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_CODE_UNAUTHORIZED} = require("../constant/constant");
const {admin} = require('../authentication/firebase');

async function loginController(req, res, next) {
  try {
    let { email, password, idToken } = req.body;
    idToken = idToken.i.toString();

    try {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await admin.auth().createSessionCookie(idToken, {expiresIn});
      res.cookie('session', sessionCookie, {maxAge: expiresIn, httpOnly: true}); // TODO K su dụng option secure vì chưa chỉnh https
      res.cookie('authenticated', true, {maxAge: expiresIn});

      const user = await User.findOne({ email, password });
      return res.json({
        status: RESPONSE_STATUS_SUCCESS,
        data: {
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      })
    } catch (e) {
      return res.json({status: RESPONSE_STATUS_FAIL, statusCode: RESPONSE_STATUS_CODE_UNAUTHORIZED, message: 'UNAUTHORIZED REQUEST'})
    }
  } catch (e) {
    next(e)
  }
}


module.exports = {
  loginController,
}
