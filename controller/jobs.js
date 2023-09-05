
module.exports.jobPage = async function(req,res){
    const { default: fetch } = await import('node-fetch');
    const response = await fetch('https://remotive.com/api/remote-jobs');
    const jobsData = await response.json();
    return res.render('placementCell',{
        title: "Placement cell",
        body: jobsData.jobs
    })
}