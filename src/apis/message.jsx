import axios from "../axios/axios"

export const usersdata=async(token)=>{
    try{
            const response=await axios({
            url:"/message/usersdata",
            method:"get",
            headers:{ 'accesstoken': token }
        })  
       return response;
    }catch(error){
     
        return error
    }
}

export const getconversation=async(token)=>{
    try{    
          
            const response=await axios({
            url:"/conversation/getconversation",
            method:"get",
            headers:{ 'accesstoken':token }
        })  
       return response;
    }catch(error){
    
        return error
    }
}

export const getconverreqsation=async(token)=>{
    try{
            const response=await axios({
            url:"/conversation/getconverreqsation",
            method:"get",
            headers:{ 'recuitertoken': token }
        })  
       return response;
    }catch(error){
    
        return error
    }
}

export const newConversation=async(recieverId,senderId)=>{
    try{
            const response=await axios({
            url:"/conversation/newConversation",
            method:"post",
            data:{recieverId,senderId}
        })  
       return response;
    }catch(error){
    
        return error
    }
}

