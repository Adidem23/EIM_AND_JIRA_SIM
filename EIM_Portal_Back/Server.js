const express = require('express')
const app = express()
const CORS = require('cors')
const BodyParser = require('body-parser')
const PORT = 1820

const Mongoose = require('mongoose')
require('dotenv').config();
const DatabaseUserName = process.env.DATABASEUSER
const DatabasePassword = process.env.DATABASEUSERPASSWORD
const RecordsDB = require('./Model/Data')

app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(CORS({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

const URI = `mongodb+srv://${DatabaseUserName}:${DatabasePassword}@adicluster.enmgmgy.mongodb.net/?retryWrites=true&w=majority&appName=AdiCluster`

Mongoose.connect(URI).then(() => {
    console.log("Connected To MongoDBCompass")
}).catch((err) => {
    console.log(`Error While Connecting Database : ${err}`)
})

app.post("/AddRecord", async (req, res) => {

    const InsertObject = {
        appID: req.body.appID,
        issueID: req.body.issueID,
        issueType: req.body.issueType,
        summary: req.body.summary,
        technologyType: req.body.technologyType,
        technologyVersion: req.body.technologyVersion,
        obsolateDate: req.body.obsolateDate,
        issueRemediationDate: req.body.issueRemediationDate,
        hardwareDetails: req.body.hardwareDetails,
        softwareDetails: req.body.softwareDetails,
        department: req.body.department,
        servers: req.body.servers,
        ipAddress: req.body.ipAddress,
        serverRole: req.body.serverRole,
        environment: req.body.environment
    }

    try {
        const newRecordToInsert = new RecordsDB(InsertObject)
        await newRecordToInsert.save()
        console.log("New Record is Added in Database")
        res.send("New Record is Added in Database")
    } catch (err) {
        console.log(`Error While Inserting Docs : ${err}`)
    }

})

app.post("/UpdateRecord", async (req, res) => {
    const issueIdToUpdate = req.body.issueID;

    try {

        const query = { issueID: issueIdToUpdate };
        const updatedFields = { $set: { appID: req.body.appID, issueType: req.body.issueType, summary: req.body.summary, technologyType: req.body.technologyType, technologyVersion: req.body.technologyVersion, obsolateDate: req.body.obsolateDate, issueRemediationDate: req.body.issueRemediationDate, hardwareDetails: req.body.hardwareDetails, softwareDetails: req.body.softwareDetails, department: req.body.department, ipAddress: req.body.ipAddress, serverRole: req.body.serverRole, environment: req.body.environment }, $push: { servers: req.body.servers} }

        RecordsDB.findOneAndUpdate(query, updatedFields)
            .then(updatedDocument => {
                console.log("Record is updated in Database")
                res.send(updatedDocument)
            })

    } catch (err) {
        console.log(`Error While Upadting Data : ${err}`)
    }
})

app.get("/AllHardwareIssues",async (req,res)=>{

    try{
        const hardwareDocs=await RecordsDB.find({issueType:"Hardware"})
        res.send(hardwareDocs)
    }catch(err){
        console.log(`Error While Making Query :${err}`)
    }

})

app.get("/AllSoftwareIssues",async (req,res)=>{

    try{
        const softWareDocs=await RecordsDB.find({issueType:"Software"})
        res.send(softWareDocs)
    }catch(err){
        console.log(`Error While Making Query :${err}`)
    }

})

app.get("/TotalHardwareIssuesLength",async (req,res)=>{

    try{
        const hardwareDocs=await RecordsDB.find({issueType:"Hardware"})
        const lengthofHardwareDocs=hardwareDocs.length.toString();
        res.send(lengthofHardwareDocs)
    }catch(err){
        console.log(`Error While Making Query :${err}`)
    }

})

app.get("/TotalSoftwareIssuesLength",async (req,res)=>{

    try{
        const softWareDocs=await RecordsDB.find({issueType:"Software"})
        const lengthofsoftWareDocs=softWareDocs.length;
        res.send(lengthofsoftWareDocs)
    }catch(err){
        console.log(`Error While Making Query :${err}`)
    }

})

app.listen(PORT, () => {
    console.log(`Server is Up on PORT : ${PORT}`)
})