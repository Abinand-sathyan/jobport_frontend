import{react,useState} from 'react'
import Navbar from '../Navbar';
import SideBar from '../SideBar';
import Addsubscriptionform from './Addsubscriptionform';


const AddSubcription = () => {


  return (
    <div className='ab'>
    
    <Navbar/>
    <div className='flex'>
    <SideBar/>
    <Addsubscriptionform/>
    </div>
  </div>
  )
}

export default AddSubcription
