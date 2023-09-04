const express = require('express');
const router = express.Router();

const employeedashboard = require('../controller/student');

router.get('/dashboard',employeedashboard.dashboard);
router.get('/student',employeedashboard.addStudentPage);
router.post('/addstudent',employeedashboard.addStudent);


module.exports = router





