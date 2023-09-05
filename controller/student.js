const Student = require("../models/student")
const Interview = require('../models/interview');
const Result = require('../models/result');
const convertor = require('objects-to-csv');
const fs = require('fs')
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

// Download the data
module.exports.downloadData = async function(req, res) {
    // Retrieve a list of all students from the database
    const studentList = await Student.find({});

    // Initialize the array to store the processed data
    const dataPresent = [];
    
    // Loop through each student in studentList
    for (var i = 0; i < studentList.length; i++) {
        const student = studentList[i];
        
        // Loop through each interview associated with the student
        for (var j = 0; j < student.interviews.length; j++) {
            const id = student.interviews[j]; // Note the correction here
            
            // Find the interview data by its id
            const interviewData = await Interview.findById(id);
            
            if (interviewData) { // Check if interviewData is not null
                // Initialize the result as "On Hold" Default value
                var result = "On Hold";
                
                // Check if the student id is present in the interview's result array
                if (interviewData.result) { // Check if result property exists
                    const resultIndex = interviewData.result.indexOf(student.id);
                    
                    if (resultIndex != -1) {
                        // If the student id is found in the result array, get the result array data
                        const resultData = await Result.find({ studentId: interviewData.result[resultIndex] });
                        
                        // Loop through the result data to find result corresponding to this interview
                        for (var k = 0; k < resultData.length; k++) {
                            if (resultData[k].interviewId == interviewData.id) {
                                result = resultData[k].result;
                                break;
                            }
                        }
                    }
                }
                
                // Create an object containing student and interview information
                const list = {
                    StudentId: student.id,
                    Batch: student.batch,
                    Name: student.name,
                    Email: student.email,
                    Status: student.status,
                    College: student.college,
                    DSA: student.DSA_FinalScore,
                    WEBD: student.WebD_FinalScore,
                    REACT: student.React_FinalScore,
                    CompanyName: interviewData.companyName,
                    InterviewDate: interviewData.date.toString().substring(4, 15),
                    Result: result
                };
                
                // Add the object to the data present array
                dataPresent.push(list);
            }
        }
    }
    
    // Create the csv converter instance and write the data to a csv file
    const csv = new convertor(dataPresent);
    await csv.toDisk('./studentData.csv');
    
    // Sending the csv file
    return res.download('./studentData.csv', () => {
        // Callback function executed after the file has been sent for download
        // For deleting the file
        // Delete the csv file to clean up
        fs.unlinkSync('./studentData.csv');
    });
}
