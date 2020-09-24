const User = require("../models/User");
const {getUsers} = require('../authentication/firebase');
const {RESPONSE_STATUS_FAIL, RESPONSE_STATUS_SUCCESS} = require("../constant/constant");


async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.json({
        status: RESPONSE_STATUS_FAIL,
        message: 'Username or password is incorect'
      })
    }

    getUsers()

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
    next(e)
  }
}


module.exports = {
  loginController,
}
