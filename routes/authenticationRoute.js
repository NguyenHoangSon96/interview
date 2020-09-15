const express = require('express');
const router = express.Router();

const {registerController} = require("../controllers/registerController");
const {loginController} = require("../controllers/loginController");
const {logoutController} = require("../controllers/logoutController");

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;
