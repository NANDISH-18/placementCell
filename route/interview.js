const express = require('express');
const router = express.Router();
const interviewPage = require('../controller/interview');

router.get('/:id',interviewPage.interviewForm);

module.exports = router;
