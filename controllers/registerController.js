const User = require("../models/User");

const {createUser} = require('../authentication/firebase');
const { ROLE_USER, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_FAIL } = require("../constant/constant");
const {registerValidator} = require('../validator/registerValidator');

async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    registerValidator(req.body, next);


    const user = await User.findOne({username, email}).lean();
    if (user) {
      return res.json({
          status: RESPONSE_STATUS_FAIL,
          message: 'Username or email already exist',
      });
    }

    // Create user in Firebase
    const userFirebase = await createUser(email, password);
    console.log(userFirebase);

    // Create user in Mongodb
    const newUser = new User({
      role: ROLE_USER,
      firebaseUid: userFirebase.uid,
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
  registerController,
}
