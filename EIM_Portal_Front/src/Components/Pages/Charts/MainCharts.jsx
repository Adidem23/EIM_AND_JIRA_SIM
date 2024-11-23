import PieCharts from "./PieCharts"
import { Bargraph } from "./BarGrpah"
import Techchartspie from "./TechChart"
import { DeptBarGraph } from "./Deptbar"
import EnvPieChart from "./EnvPie"

const MainCharts = () => {
  return (
    <>
    <h2 style={{display:'block',width:'fit-content',fontWeight:'bold',margin:'auto',fontSize:'30px'}}>ALL CHARTS</h2>
    <div style={{display:'flex',flexDirection:'row',width:'fit-content'}}>
    <PieCharts />
    <Bargraph />
    </div>
    <div style={{display:'flex',flexDirection:'row',width:'fit-content',marginTop:'20px'}}>
    <Techchartspie />
    <DeptBarGraph />
    <EnvPieChart />
    </div>
    </>
  )
}

export default MainCharts