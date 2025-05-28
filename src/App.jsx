import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
       
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App