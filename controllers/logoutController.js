const createError = require('http-errors')


async function logoutController(req, res, next) {
  try {
      // return next(createError(400, 'Bad request', { error: errors.array() }));



    res.send('');
  } catch (e) {
    next(e)
  }
}


module.exports = {
  logoutController,
}
