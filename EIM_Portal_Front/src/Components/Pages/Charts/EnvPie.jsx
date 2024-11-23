import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function EnvPieChart() {

    const [DEV, setDEV] = useState(0)
    const [QA, setQA] = useState(0)
    const [STAGE, setSTAGE] = useState(0)
    const [PROD, setPROD] = useState(0)

    const getPieChartData = async () => {
        await axios.get("http://localhost:8000/envData").then((res) => {
            setDEV(res.data['DEV'])
            setPROD(res.data['PROD'])
            setQA(res.data['QA'])
            setSTAGE(res.data['STAGE'])
        }).catch((e) => {
            console.log(`Error while Making Request:${e}`)
        })
    }

    useEffect(() => {
        getPieChartData();
    }, [])


    const data = [
        ["ENVIRONMENT", "NO.of Tickets"],
        ["DEV", DEV],
        ["PROD", PROD],
        ["QA", QA],
        ["STAGE", STAGE],
    ];


    const options = {
        title: "Environment",
        pieHole: 0.4,
        is3D: true,
        pieStartAngle: 100,
        sliceVisibilityThreshold: 0.02,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"500px"}
            height={"300px"}
        />
    );
}