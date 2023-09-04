const Student = require('../models/student');
const Interview = require('../models/interview');


// Interview allocation form
module.exports.interviewForm = async function(req,res){
    return res.render('formForInterviewAllocation',{
        title: "Interview Allocation",
        id: req.params.id
    })
}

// Interview allocation
module.exports.interviewAllocation = async function(req,res){
    const companyPresent = await Interview.findOne({companyName: req.body.companyName});

    if(companyPresent){
        // Check if the company already has an interview record in the database
        const id = req.body.studentID;
        const studentPresent = await Student.findById(id);
        const index = studentPresent.interviews.indexOf(companyPresent.id);

        if(index == -1){
            studentPresent.interviews.push(companyPresent.id);
            await companyPresent.save();
        }
        // interview table
        const cindex = companyPresent.students.indexOf(studentPresent.id);
        if(cindex == -1){
            companyPresent.students.push(studentPresent.id);
            await companyPresent.save();
        }
    }else{
        const company = await Interview.create({companyName: req.body.companyName, date: req.body.date});
        const id = req.body.studentID;
        const studentPresent = await Student.findById(id);
        const index = studentPresent.interviews.indexOf(company.id);
        if(index == -1){
            studentPresent.interviews.push(company.id);
            await studentPresent.save();
        }
        const cindex = company.students.indexOf(studentPresent.id);
        if(cindex == -1){
            
        }
    }

}

















