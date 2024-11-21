import { Routes, Route } from 'react-router-dom'
import MainPage from './Components/Pages/MainPage'
import {SidebarDemo} from '../src/Components/Pages/Sidebar'
import Profile from './Components/Pages/Profile'
import MainCharts from './Components/Pages/Charts/MainCharts'
import AddRecords from './Components/Pages/AddRecords'

function App() {

  return (
    <>
      <Routes>
       <Route path='/' Component={MainPage} />
       <Route path='/profile' Component={Profile} />
       <Route path='/charts' Component={MainCharts} />
       <Route path='/sidebar' Component={SidebarDemo} />
       <Route path='/AddRecords' Component={AddRecords} />
      </Routes>
    </>
  )
}

export default App
