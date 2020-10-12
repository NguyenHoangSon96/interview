const moment = require('moment');

const {RESPONSE_STATUS_SUCCESS} = require("../constant/constant");

async function logoutController(req, res, next) {
  try {
    res.clearCookie('session', {path: '/', httpOnly: true});
    res.clearCookie('authenticated', {path: '/'});
    res.json(RESPONSE_STATUS_SUCCESS);
  } catch (e) {
    next(e)
  }
}


module.exports = {
  logoutController,
}
