const Interview = require('../models/interview');
const Student = require('../models/student');
const Result = require('../models/result');
module.exports.resultPage = async function(req,res){
    const id = req.params.id;
    const companyResult = await Interview.findById(id).populate('students');
    return res.render('result',{
        title: 'Result',
        companyResult: companyResult
    })
}

// update the result
module.exports.update = async function(req, res) {
    // Create a new Result instance based on the request body
    const updateResult = new Result(req.body);

    // Save the new Result instance to the database
    await updateResult.save();

    // Get the interview ID from the request body
    const id = req.body.interviewId;

    // Find the interview result document by its ID
    const interviewResult = await Interview.findById(id);

    // Check if the student ID is not already in the interview result
    const index = interviewResult.result.indexOf(req.body.studentId);
    if (index == -1) {
        // If not in the result, add the student ID to the interview result
        interviewResult.result.push(req.body.studentId);

        // Save the updated interview result document
        await interviewResult.save();
    }

    // Check if the result is "PASS"
    if (req.body.result == "PASS") {
        const studentId = req.body.studentId;

        // Find the student document by its ID
        const studentPresent = await Student.findById(studentId);

        // Update the student's status to "placed"
        studentPresent.status = "placed";

        // Save the updated student document
        await studentPresent.save();
    }

    // Redirect back to the previous page
    return res.redirect('back');
}
