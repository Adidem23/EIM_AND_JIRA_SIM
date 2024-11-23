import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useState, useEffect } from 'react';



export function DeptBarGraph() {

    const [IT, setIT] = useState(0)
    const [Finance, setFinance] = useState(0)
    const [HR, setHR] = useState(0)
    const [RD, setRD] = useState(0)
    const [GDT, setGDT] = useState(0)

    const GraphData = [
        ["Department", "NO.of Tickets Created", { role: "style" }],
        [`IT`,IT , "#b87333"],
        [`Finance`,Finance , "silver"],
        [`HR`,HR , "gold"],
        [`R&D`, RD, "color: #e5e4e2"],
        [`GDT`, GDT, "color: #8AD1C2"],
    ];

    const Options = {
        title: "Department VS Issues",
    }


    const getBarGraphData = async () => {
        await axios.get("http://localhost:8000/deptBarGraph").then((res) => {
            setIT(res.data['IT'])
            setFinance(res.data['FINANCE'])
            setHR(res.data['HR'])
            setRD(res.data['RD'])
            setGDT(res.data['GDT'])
        }).catch((e) => {
            console.log(`Error while Making Request:${e}`)
        })
    }

    useEffect(() => {
        getBarGraphData()
    }, [])

    return (
        <Chart chartType="ColumnChart" width="400px" height="60%" data={GraphData} style={{ marginTop: '30px' }} />
    );
}