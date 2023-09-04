const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Employee = require('../models/employee');

let passportCallback = async function(req,email,password,done){
    try {
        const employeePresent = await Employee.findOne({email: email});

        if(!employeePresent || employeePresent.password != password){
            // flash message should be display
            console.log('Please enter valid email and password');
            return done(null,false);
        }
        return done(null,employeePresent);

    } catch (error) {
        return done(error)
    }
}

passport.use(new passportLocal({usernameField: 'email', passReqToCallback:true},passportCallback));
passport.serializeUser(function(employee,done){
    return done(null,employee.email);
});

const deserializeUserCallback = async function(email,done){
    try {
        const employeeLogin = await Employee.findOne({email: email});
        return done(null,employeeLogin);
    } catch (error) {
        return done(error);
        
    }
}
passport.deserializeUser(deserializeUserCallback);

// Check the user is authenticated or not
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated){
        // req.user contains user details
        return next();
    }
    return res.redirect('/');
}

module.exports = passport;







