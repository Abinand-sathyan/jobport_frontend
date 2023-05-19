import React, { useState } from 'react';
import axios from "../../../axios/axios"
import { message } from "antd";
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const VerifyNumber = () => {
  const [MobileNumber,setMobileNumber] = useState('');
  
  const Navigate = useNavigate();
  const handleVerification = async(e) => {
    e.preventDefault();
    // Handle verification logic here
    let data = new FormData(e.currentTarget);
    data = {
        phoneNumber: data.get('phoneNumber'),
      };
    
      const regPhone = /^[0-9]+$/;
      if(data.phoneNumber){
         if(regPhone.test(data.phoneNumber)){
            if (data.phoneNumber.length === 10){
             
                const response = await axios({
                    url: "/Auth/verifynumber",
                    method: "post",
                    data: {
                      data,
                    },
                  });
              
                  if (response.data.success) {
                    Navigate("/fgtotp",{state:response.data.data._id});
                  }else{
                    message.error("Mobile number not exist");
                }
            }
         }
      }
  };


  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-siteviolet mb-4">Verify your number</h2>
        <form onSubmit={handleVerification}>
          <div className="mb-4">
            {/* <label htmlFor="verificationCode" className="block font-medium mb-1">
              Verification Code
            </label> */}
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={MobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                      Verify
                      </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default VerifyNumber;

