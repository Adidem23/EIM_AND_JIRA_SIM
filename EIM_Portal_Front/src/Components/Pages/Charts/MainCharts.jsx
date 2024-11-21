import PieCharts from "./PieCharts"
import { Bargraph } from "./BarGrpah"

const MainCharts = () => {
  return (
    <>
    <div style={{display:'flex',flexDirection:'row',width:'fit-content'}}>
    <PieCharts />
    <Bargraph />
    </div>
    </>
  )
}

export default MainCharts