const express = require('express')
const app = express()
const CORS = require('cors')
const BodyParser = require('body-parser')
const PORT = 5000
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();
const JEKINS_DOMAIN_NAME = process.env.JENKINS_DOMAIN
const JENKINS_JOB_NAME_DATA = process.env.JENKINS_JOB
const JENKINS_JOB_NAME_DATA_SCRIPT = process.env.JENKINS_SCRIPT_JOB
const JENKINS_USERNAME_DATA = process.env.JENKINS_USERNAME
const JENKINS_PASSWORD = process.env.JENKINS_AUTHTOKEN
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY

app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(CORS({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("<h1>Server is ON !!</h1>")
})


app.get("/RunDataPipeline", async (req, res) => {

    await fetch(`${JEKINS_DOMAIN_NAME}/job/${JENKINS_JOB_NAME_DATA}/build`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${JENKINS_USERNAME_DATA}:${JENKINS_PASSWORD}`).toString('base64')}`,
        }
    }).then(async (response) => {
        res.send("Pipeline Run Successsfully")
    }).catch((err) => {
        console.log(`Error while Making Request : ${err}`);
    })
})

app.get("/RunScriptPipeline", async (req, res) => {

    await fetch(`${JEKINS_DOMAIN_NAME}/job/${JENKINS_JOB_NAME_DATA_SCRIPT}/build`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${JENKINS_USERNAME_DATA}:${JENKINS_PASSWORD}`).toString('base64')}`,
        }
    }).then(async (response) => {
        console.log(response.data)
        res.send(res.data)
    }).catch((err) => {
        console.log(`Error while Making Request : ${err}`);
    })
})

app.post("/ASKGEMINI", async (req, res) => {
    const SUMMARY = req.body.summary
    const Issutype = req.body.Issutype
    const Techtype = req.body.Techtype
    const TechDepart = req.body.TechDepart
    const Tech_VERSION = req.body.Tech_VERSION


    const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI assistant for Enterprise Inventory Management. Analyze the following issue details and provide a solution:

    Issue Summary: ${SUMMARY}
    Issue Type: ${Issutype}  
    Technology Involved: ${Techtype} 
    Version: ${Tech_VERSION}
    Responsible Department: ${TechDepart} 

    Based on this information:
    1. What could be the root cause of this issue?  
    2. Provide actionable steps to resolve it.  
    3. Highlight any risks or dependencies that could impact resolution.  
    4. Suggest an efficient plan to remediate the issue before {{issueRemediationDate}}.`;

    const result = await model.generateContent(prompt);

    res.send(result.response.text())
})

app.listen(PORT, () => {
    console.log(`Server is Up on PORT : ${PORT}`)
})