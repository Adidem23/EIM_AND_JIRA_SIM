import { Routes, Route } from 'react-router-dom'
import BeforeSign from './Components/Pages/BeforeSign'
import TabsDemo from './Components/Pages/Tabs'

function App() {

  return (
    <>
      <Routes>
       <Route path='/' Component={BeforeSign} />
       <Route path='/tabs' Component={TabsDemo} />
      </Routes>
    </>
  )
}

export default App
