import React, { useEffect, useState } from 'react'
import axios from '../../../axios/axios'


const Conversation = ({conversation,currentreqdata}) => {

    const [user,setUser]=useState(null)

    useEffect(()=>{

   
        const userId=conversation?.members?.find((m)=>m !==currentreqdata)
      
      
        const getUser=async()=>{
            try{
                const res= await axios(`/conversation/users?userId=${userId}`)
              
               setUser(res.data)                                                                              
            }catch(err){
                 
            }
        }
        getUser()
    },[currentreqdata,conversation]) 
  
    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            H
        </div>
        <div className="ml-2 text-sm font-semibold">{user?.user[0].first_name}</div>
        </button>
  )
}

export default Conversation
