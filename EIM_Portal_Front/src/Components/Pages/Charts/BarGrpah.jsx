import { Chart } from 'react-google-charts';

export const GraphData = [
    ["Days", "NO.of Tickets Created", { role: "style" }],
    ["21 NOV", 0, "#b87333"], 
    ["20 NOV", 0, "silver"],
    ["19 NOV", 0, "gold"],
    ["18 NOV", 0, "color: #e5e4e2"],
    ["17 NOV", 50, "color: #8AD1C2"], 
    ["16 NOV", 20, "color: #9F8AD1"], 
];

export function Bargraph() {
    return (
        <Chart chartType="ColumnChart" width="800px" height="60%" data={GraphData} style={{marginTop:'30px'}} />
    );
}