const User = require("../models/User");
const _ = require('lodash');

const { ROLE_USER, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_FAIL } = require("../constant/constant");

async function getUsers(req, res, next) {
  try {
    let {page, pageSize, query} = JSON.parse(req.query.data);

    if (query) {
      if (query.email) {
        query.email = new RegExp(query.email, 'i');
      }
      if (query.username) {
        query.username = new RegExp(query.username, 'i');
      }
      if (query.role) {
        query.role = new RegExp(query.role, 'i');
      }
    }

    const results = await User.find(query)
                              .limit(pageSize)
                              .skip(Math.abs(pageSize * (page - 1)))
                              .lean();
    const countAllResult = await User.countDocuments(query);


    return res.json({
      status: RESPONSE_STATUS_SUCCESS,
      data: results,
      countAllResult: countAllResult,
      message: undefined,
    });
  } catch (e) {
    next(e)
  }
}


module.exports = {
  getUsers,
}
