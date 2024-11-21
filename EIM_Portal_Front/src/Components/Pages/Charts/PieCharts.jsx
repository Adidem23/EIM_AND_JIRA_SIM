import {Chart} from 'react-google-charts';
import axios from 'axios';
import { useState,useEffect } from 'react';



export default function PieCharts() {

  const [HardwareNum, setHardwareNum] = useState(0)
  const [SoftwareNum, setSoftwareNum] = useState(0)

  const getPieChartData=async()=>{
    await axios.get("http://localhost:8000/pieChartsData").then((res)=>{
      setHardwareNum(res.data['HARDWARE_LEN'])
      setSoftwareNum(res.data['SOFTWARE_LEN'])
    }).catch((e)=>{
      console.log(`Error while Making Request:${e}`)
    })
  }

  useEffect(()=>{
  getPieChartData();
  },[])

    const data = [
      ["IssueType", "Percentage"],
      ["Hardware", HardwareNum],
      ["Software", SoftwareNum],
    ];
  
    const options = {
      title: "IssueType Piechart",
      pieHole: 0.4,
      is3D: true,
      pieStartAngle: 90,
      sliceVisibilityThreshold: 0.02,
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "#233238",
          fontSize: 20,
        },
      },
      colors: ["#8AD1C2", "#9F8AD1"],
    };

    return (
      <Chart
      style={{marginLeft:'10px'}}
        chartType="PieChart"
        data={data}
        options={options}
        width={"500px"}
        height={"300px"}
      />
    );
  }