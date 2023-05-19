import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Search from './SearchDiv/Search'
import Jobs from './JobDiv/Jobs'
import Value from './ValueDiv/Value'
import Footer from './FooterDiv/Footer'

const Findjobs=()=>{
  return (
     <div >
      <Navbar/>
      <Search/>
      <Jobs/>
      <Value/>
      <Footer/>
    </div>
  )
}

export default Findjobs
