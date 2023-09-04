const Employee = require('../models/employee');
const validator = require('validator');

// Sign In page
module.exports.signInPage = async function(req,res){
    return res.render('signIn',{
        title:"signIn"
    })
}

// Sign in
module.exports.signIn = async function(req,res){
    try {
        return res.redirect('/employee/dashboard')
    } catch (error) {
        return res.send('<h1>Error in sign in</h1>')
    }
}

// Sign up page
module.exports.signUp = async function(req,res){
    return res.render('signUp',{
        title: "Sign Up",
        firstNameError:"",
        lastNameError:"",
        emailError:"",
        passwordError:"",
    })
}
// sign up and store the user detail in DB
module.exports.createSession = async function(req,res){
   
        if(req.body.firstname.length === 0){
            return res.render('signUp',{
                title: "Sign Up",
                firstNameError:"First Name can not blank",
                lastNameError:"",
                emailError:"",
                passwordError:"",
            })
        }
        if(!isNaN(req.body.firstname)){
            return res.render('signUp',{
                title: "Sign Up",
                firstNameError:"First Name is not number",
                lastNameError:"",
                emailError:"",
                passwordError:"",
            })
        }
        // For last name
        if(req.body.lastname.length === 0){
            return res.render('signUp',{
                title: "Sign Up",
                firstNameError:"",
                lastNameError:"Last name can not blank",
                emailError:"",
                passwordError:"",
            })
        }
        if(!isNaN(req.body.lastname)){
            return res.render('signUp',{
                title: "Sign Up",
                firstNameError:"",
                lastNameError:"Last name is not number",
                emailError:"",
                passwordError:"",
            })
        }
        // Check on email
        // if(validator.isEmail(req.body.email)){
        //     return res.render('signUp',{
        //         title: "Sign Up",
        //         firstNameError:"",
        //         lastNameError:"",
        //         emailError:"",
        //         passwordError:"Please enter valid email",
        //     })
        // }
        if(req.body.password.length < 2){
            return res.render('signUp',{
                title: "Sign Up",
                firstNameError:"",
                lastNameError:"",
                emailError:"",
                passwordError:"Password is small",
            })
        }else{
            const employeePresent = await Employee.findOne({email: req.body.email});
            if(employeePresent){
                // flash message should be dispaly
                console.log("Employee already exist");
                return res.redirect('/');
            }else{
                const registerEmployee = await Employee(req.body);
                registerEmployee.save();
                console.log("Login successfully");
                return res.redirect('/');
            }
        }
   
}
