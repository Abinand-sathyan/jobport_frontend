import React from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import SubscriptionTable from './SubscriptionTable'

const Adminsubscription = () => {
  return (
    <div className='ab'>
    
    <Navbar/>
    <div className='flex'>
    <SideBar/>
    < SubscriptionTable/>  
    </div>
  </div>
  )
}

export default Adminsubscription
