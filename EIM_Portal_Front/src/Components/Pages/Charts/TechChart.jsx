import { Chart } from "react-google-charts";
import { useState,useEffect } from "react";
import axios from 'axios';

export default function Techchartspie() {

    const [DatabaseNUM, setDatabaseNUM] = useState(0)
    const [NetworkingNUM, setNetworkingNUM] = useState(0)
    const [ServerNUM, setServerNUM] = useState(0)
    const [StorageNUM, setStorageNUM] = useState(0)

    const getPieChartData = async () => {
        await axios.get("http://localhost:8000/techPieChartData").then((res) => {
            setDatabaseNUM(res.data['DATABASE'])
            setNetworkingNUM(res.data['NETWORK'])
            setServerNUM(res.data['SERVER'])
            setStorageNUM(res.data['STORAGE'])
        }).catch((e) => {
            console.log(`Error while Making Request:${e}`)
        })
    }

    useEffect(() => {
        getPieChartData();
    }, [])


    const data = [
        ["TechType", "NO.of Tickets"],
        ["Database", DatabaseNUM],
        ["Networking", NetworkingNUM],
        ["Server", ServerNUM],
        ["Storage", StorageNUM],
    ];


    const options = {
        title: "Technology version",
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