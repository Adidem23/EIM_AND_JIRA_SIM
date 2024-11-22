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
    const query = req.body.query
    const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =`Team Has many Issues in JIRA project and one of issue is ${query}. Give some resolution of this issue`;

    const result = await model.generateContent(prompt);
    
    res.send(result.response.text())
})

app.listen(PORT, () => {
    console.log(`Server is Up on PORT : ${PORT}`)
})