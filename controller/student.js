const Student = require("../models/student")

// employee dashboard
module.exports.dashboard = async function(req,res){
    const studentList = await Student.find({});
    return res.render('employeeDashboard',{
        title:'EmployeeDashboard',
        studentList: studentList
    })
}

// add student page
module.exports.addStudentPage =  async function(req,res){
    return res.render('addStudent',{
        title: 'Student'
    })
}


// add student
module.exports.addStudent = async function(req,res){
    try {
        const presentStudent = await Student.findOne({email: req.body.email});
        if(presentStudent){
            // flash message should be display
            return res.redirect('back')
        }else{
            const addStudent = await Student(req.body);
            await addStudent.save();
            return res.redirect('/employee/dashboard');
        }
    } catch (error) {
        return res.send("error in adding student");
    }
    
}





