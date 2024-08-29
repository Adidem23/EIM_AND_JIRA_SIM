const axios = require('axios')

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate() {
    const start = new Date(2024, 0, 1); // Jan 1, 2024
    const end = new Date(2025, 0, 1);   // Jan 1, 2025
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const summaries = [
    "CPU performance issue",
    "Memory leak detected",
    "Hard drive failure",
    "Network card malfunction",
    "Power supply failure",
    "Cooling system failure"
];

const technologyTypes = ["Database", "Networking", "Server", "Storage"];
const technologyVersions = ["Provision v1", "Cisco v2", "Dell EMC v3", "Oracle v4"];
const departments = ["IT", "Finance", "HR", "R&D", "GDT"];
const servers = ["GDB21", "GDB22", "GDB34", "GDB35", "GDB39", "GDB40"];
const serverRoles = ["DataCenter", "WebServer", "ApplicationServer", "DatabaseServer"];
const environments = ["DEV", "PROD", "QA", "STAGE"];
const cpuOptions = ["8 Core", "12 Core", "16 Core", "24 Core"];
const issuetypeoptions = ["Hardware", "Software"]


async function CreateNewDataPoints() {

    const appID = 14590 + Math.floor(Math.random() * 255);
    const issueID = 145890 + Math.floor(Math.random() * 900);

    const data = {
        "appID": appID,
        "issueID": issueID,
        "issueType": getRandomElement(issuetypeoptions),
        "summary": getRandomElement(summaries),
        "technologyType": getRandomElement(technologyTypes),
        "technologyVersion": getRandomElement(technologyVersions),
        "obsolateDate": getRandomDate(),
        "issueRemediationDate": getRandomDate(),
        "hardwareDetails": [
            {
                "CPU": getRandomElement(cpuOptions)
            }
        ],
        "softwareDetails": [
            {
                "CPU": getRandomElement(cpuOptions)
            }
        ],
        "department": getRandomElement(departments),
        "servers": [
            getRandomElement(servers),
            getRandomElement(servers)
        ],
        "ipAddress": `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        "serverRole": getRandomElement(serverRoles),
        "environment": getRandomElement(environments)
    };


    try {
        await axios.post("https://eim-and-jira-sim-back.vercel.app/AddRecord", {
            appID: data.appID,
            issueID: data.issueID,
            issueType: data.issueType,
            summary: data.summary,
            technologyType: data.technologyType,
            technologyVersion: data.technologyVersion,
            obsolateDate: data.obsolateDate,
            issueRemediationDate: data.issueRemediationDate,
            hardwareDetails: data.hardwareDetails,
            softwareDetails: data.softwareDetails,
            department: data.department,
            servers: data.servers,
            ipAddress: data.ipAddress,
            serverRole: data.serverRole,
            environment: data.environment
        }, { withCredentials: true }).then((res)=>{
            console.log(res.data)
        })
    } catch (err) {
        console.log(`Error While Making Request : ${err}`)
    }

}

CreateNewDataPoints()