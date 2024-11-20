import { Routes, Route } from 'react-router-dom'
import MainPage from './Components/Pages/MainPage'
import {SidebarDemo} from '../src/Components/Pages/Sidebar'
import Profile from './Components/Pages/Profile'

function App() {

  return (
    <>
      <Routes>
       <Route path='/' Component={MainPage} />
       <Route path='/profile' Component={Profile} />
       <Route path='/sidebar' Component={SidebarDemo} />
      </Routes>
    </>
  )
}

export default App
