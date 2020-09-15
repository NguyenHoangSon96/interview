const express = require('express');
const router = express.Router();

const { CONFIG_GROUP_BOOKING_EVENT, CONFIG_GROUP_BOOKING_STATUS, ROLE_ADMIN } = require('../constant/constant');
const GlobalConfig = require('../models/GlobalConfig');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/initGlobalConfig', async function(req, res, next) {
  try {
    const { key, value, createdBy } = req.body;

    const bookingStatus = [
        {key: 'pending', value: 'pending'},
        {key: 'reject', value: 'reject'},
        {key: 'approved', value: 'approved'},
    ]
    bookingStatus.forEach(item => {
      const config = {
        key: item.key,
        value: item.value,
        group: CONFIG_GROUP_BOOKING_STATUS,
        createdBy: ROLE_ADMIN
      };
      GlobalConfig.findOneAndUpdate(
          {group: CONFIG_GROUP_BOOKING_STATUS, key: item.key},
          config,
          {upsert: true},
          function(err, doc) {
            if (err) next(err);
          }
      )
    });

    const bookingEvent = [
      {key: 'heathTalk', value: 'Health Talk'},
      {key: 'wellnessEvents', value: 'Wellness Events'},
      {key: 'fitnessActivities', value: 'Fitness Activities'},
    ];
    bookingEvent.forEach(item => {
      const config = {
        key: item.key,
        value: item.value,
        group: CONFIG_GROUP_BOOKING_EVENT,
        createdBy: ROLE_ADMIN
      };
      GlobalConfig.findOneAndUpdate(
          {group: CONFIG_GROUP_BOOKING_EVENT, key: item.key},
          config,
          {upsert: true},
          function(err, doc) {
            if (err) next(err);
          }
      )
    });

    res.json({
      status: 'ok',
    });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
