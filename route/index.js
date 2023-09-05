const express = require('express');
const router = express.Router();

const employee = require('../controller/employee');
const passport = require('passport');

// Sign up page
router.get('/signUp',employee.signUp);
// create session
router.post('/create_session',employee.createSession);
// sign In page
router.get('/',employee.signInPage);
// sign in
router.post('/sign_in',passport.authenticate('local',{failureRedirect: '/'}),employee.signIn);

// Sign out
router.get('/destroy_session',employee.signOut);

// employeeDashboard
router.use('/employee',require('./employeedashboard'));
// Interview
router.use('/student',require('./interview'));
// Jobs 
router.use('/job',require('./job'));
// result
router.use('/result',require('./result'));

module.exports = router;
