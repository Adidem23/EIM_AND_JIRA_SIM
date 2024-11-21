import axios from 'axios'
import { useState } from 'react'

const AddRecords = () => {

   const [appId, setappId] = useState(0)
   const [IssueId, setIssueId] = useState(0)
   const [IssueType, setIssueType] = useState("")
   const [summary, setsummary] = useState("")
   const [TechType, setTechType] = useState("")
   const [TechVersion, setTechVersion] = useState("")
   const [ObsoluteDate, setObsoluteDate] = useState("")
   const [Issuedate, setIssuedate] = useState("")
   const [HardwareDetails, setHardwareDetails] = useState("")
   const [SoftwareDetails, setSoftwareDetails] = useState("")
   const [Department, setDepartment] = useState("")
   const [Servers, setServers] = useState([])
   const [Ipaddress, setIpaddress] = useState("")
   const [ServerRole, setServerRole] = useState("")
   const [Env, setEnv] = useState("")

   const data = {
    appID: appId,
    issueID: IssueId,
    issueType: IssueType,
    summary: summary,
    technologyType: TechType,
    technologyVersion: TechVersion,
    obsolateDate: ObsoluteDate,
    issueRemediationDate: Issuedate,
    hardwareDetails: {
      CPU: HardwareDetails
    },
    softwareDetails: {
      CPU:SoftwareDetails
    },
    department:Department,
    servers: Servers,
    ipAddress:Ipaddress,
    serverRole: ServerRole,
    environment: Env
  };

  const AddrecordsDB=async(e)=>{
    e.preventDefault()
    
    await axios.post("https://eim-and-jira-sim-back.vercel.app/AddRecord",{
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
    },{withCredentials:true}).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log(`Error while making request:${err}`)
    })
  }

    return (
        <>
            <div className="flex flex-col h-screen dark" style={{ marginLeft: '30px', marginTop: '20px' }}>
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Add Records</h2>

                    <form className="flex flex-wrap">
                        <input
                            type="number"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
                            placeholder="AppId" onChange={(e)=>{setappId(e.target.value)}}
                        />
                        <input
                            type="number"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="IssueId" onChange={(e)=>{setIssueId(e.target.value)}}
                        />
                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
                            placeholder="summary" onChange={(e)=>{setsummary(e.target.value)}}
                        />
                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Technology Type" onChange={(e)=>{setTechType(e.target.value)}}
                        />
                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
                            placeholder="Technology Version" onChange={(e)=>{setTechVersion(e.target.value)}}
                        />
                        <input
                            type="date"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Obsolute Date" onChange={(e)=>{setObsoluteDate(e.target.value)}}
                        />

                        <input
                            type="date"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Issue Date" onChange={(e)=>{setIssuedate(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Hardware Details" onChange={(e)=>{setHardwareDetails(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Software Details" onChange={(e)=>{setSoftwareDetails(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Department" onChange={(e)=>{setDepartment(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="Servers" onChange={(e)=>{setServers(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="IPAddress" onChange={(e)=>{setIpaddress(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="ServerRole" onChange={(e)=>{setServerRole(e.target.value)}}
                        />

                        <input
                            type="text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
                            placeholder="ENV" onChange={(e)=>{setEnv(e.target.value)}}
                        />
                        

                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                         onClick={AddrecordsDB}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AddRecords