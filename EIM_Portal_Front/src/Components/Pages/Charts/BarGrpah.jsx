import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useState, useEffect } from 'react';



export function Bargraph() {

    const Currentday = new Date().getDate();
    const CurrentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    
    const [FIRSTDAY, setFIRSTDAY] = useState(0)
    const [SECONDAY, setSECONDAY] = useState(0)
    const [THIRDAY, setTHIRDAY] = useState(0)
    const [FOURTHDAY, setFOURTHDAY] = useState(0)
    const [FIFTHDAY, setFIFTHDAY] = useState(0)
    const [SIXTHDAY, setSIXTHDAY] = useState(0)

    const GraphData = [
        ["Days", "NO.of Tickets Created", { role: "style" }],
        [`${Currentday} ${CurrentMonth}`, FIRSTDAY, "#b87333"],
        [`${Currentday-1} ${CurrentMonth}`, SECONDAY, "silver"],
        [`${Currentday-2} ${CurrentMonth}`, THIRDAY, "gold"],
        [`${Currentday-3} ${CurrentMonth}`, FOURTHDAY, "color: #e5e4e2"],
        [`${Currentday-4} ${CurrentMonth}`, FIFTHDAY, "color: #8AD1C2"],
        [`${Currentday-5} ${CurrentMonth}`, SIXTHDAY, "color: #9F8AD1"],
    ];

    const Options={
        title: "IssueCreation VS Day",
    }


    const getBarGraphData = async () => {
        await axios.get("http://localhost:8000/BarGraphData").then((res) => {
            setFIRSTDAY(res.data['current_date'])
            setSECONDAY(res.data['current_date_less_1'])
            setTHIRDAY(res.data['current_date_less_2'])
            setFOURTHDAY(res.data['current_date_less_3'])
            setFIFTHDAY(res.data['current_date_less_4'])
            setSIXTHDAY(res.data['current_date_less_5'])

        }).catch((e) => {
            console.log(`Error while Making Request:${e}`)
        })
    }

    useEffect(()=>{
     getBarGraphData()
    },[])

    return (
        <Chart chartType="ColumnChart" width="700px" height="60%" data={GraphData} style={{ marginTop: '30px' }} />
    );
}