import React from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Dashboard from './Dashboard'

const Dashboards = () => {
  return (
    <div className='ab'>
    
      <Navbar/>
      <div className='flex'>
      <SideBar/>
      <Dashboard/>  
      </div>
    </div>
  )
}

export default Dashboards
