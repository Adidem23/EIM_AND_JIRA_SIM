import {Chart} from 'react-google-charts';

export default function PieCharts() {
    const data = [
      ["IssueType", "Percentage"],
      ["Hardware", 30],
      ["Software", 50],
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