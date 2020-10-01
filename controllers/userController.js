const User = require("../models/User");
const { ROLE_USER, RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_FAIL } = require("../constant/constant");

async function getUsers(req, res, next) {
  try {
    const {page, pageSize, query} = JSON.parse(req.query.data);
    // const page  = req.query.page ? Number(req.query.page) : 0;
    // const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
    // const query = req.query.query;

    const results = await User.find(query)
                             .limit(pageSize)
                             .skip(pageSize * (page -1))
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
