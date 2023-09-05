const Student = require('../models/student');
const Interview = require('../models/interview');

// Interview Page
module.exports.interviewPage = async function(req,res){
    const studentList = await Student.find({});
    const interview_list = await Interview.find({});
    return res.render('interview',{
        title: "Interview List",
        studentList: studentList,
        interview_list: interview_list
    })
}


// Interview allocation form
module.exports.interviewForm = async function(req,res){
    return res.render('formForInterviewAllocation',{
        title: "Interview Allocation",
        id: req.params.id
    })
}


// Interview allocation
module.exports.interviewAllocation = async function(req, res) {
    const companyName = req.body.companyName;
    
    // Check if the company already has an interview record in the database
    let companyPresent = await Interview.findOne({ companyName });

    if (!companyPresent) {
        // If the company doesn't exist, create a new interview record
        companyPresent = await Interview.create({ companyName, date: req.body.date });
    }

    const studentId = req.body.studentID;
    const studentPresent = await Student.findById(studentId);

    if (!studentPresent) {
        // Handle the case where the student doesn't exist or there's an error
        return res.status(404).send("Student not found");
    }

    // Check if the student is already associated with this interview
    if (!studentPresent.interviews.includes(companyPresent._id)) {
        studentPresent.interviews.push(companyPresent._id);
        await studentPresent.save();
    }

    // Check if the company is already associated with this student
    if (!companyPresent.students.includes(studentPresent._id)) {
        companyPresent.students.push(studentPresent._id);
        await companyPresent.save();
    }

    return res.redirect('/employee/dashboard');
};

















