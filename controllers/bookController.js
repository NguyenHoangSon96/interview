const User = require("../models/User");
const { ROLE_USER, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_FAIL } = require("../constant/constant");

async function getBooks(req, res, next) {
  try {
    // return next(createError(400, 'Bad request', { error: errors.array() }));
    const { username, email, password } = req.body;

    const user = await User.findOne({username}).lean();
    if (user) {
      return res.json({
          status: RESPONSE_STATUS_FAIL,
          message: 'Username or email already exist',
      });
    }

    const newUser = new User({
      role: ROLE_USER,
      username, email, password
    });
    await newUser.save();

    return res.json({
      status: RESPONSE_STATUS_SUCCESS,
      message: undefined,
    });
  } catch (e) {
    next(e)
  }
}


module.exports = {
  getBooks,
}
