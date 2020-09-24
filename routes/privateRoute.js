const express = require('express');
const router = express.Router();

const {getBooks} = require("../controllers/bookController");

router.get('/books', getBooks);

module.exports = router;
