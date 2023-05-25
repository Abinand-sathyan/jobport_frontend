import{react,useState} from 'react'
import Navbar from '../Navbar';
import SideBar from '../SideBar';
import SubmanagementTabke from './SubmanagementTabke';

const Submanage = () => {


  return (
    <div className='ab'>
    
    <Navbar/>
    <div className='flex'>
    <SideBar/>
    <SubmanagementTabke/>
    </div>
  </div>
  )
}

export default Submanage
