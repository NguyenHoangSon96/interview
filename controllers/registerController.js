const createError = require('http-errors')

const GlobalConfig = require('../models/GlobalConfig');
const User = require("../models/User");
const {ROLE_USER} = require("../constant/constant");

async function registerController(req, res, next) {
  try {
    // return next(createError(400, 'Bad request', { error: errors.array() }));
    const { userName, email, password } = req.body;

    const user = new User({
      role: ROLE_USER,
      userName, email, password});
    await user.save();

    res.json({
      status: 'ok',
      payload: {...user},
    });
  } catch (e) {
    next(e)
  }
}


module.exports = {
  registerController,
}
