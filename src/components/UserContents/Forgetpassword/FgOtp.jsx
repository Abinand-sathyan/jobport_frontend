import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from '../../Navbar/Navbar';
import axios from "../../../axios/axios"


const FgOtp = () => {
  const [otp, setOTP] = useState('');
  const [isloading, setisloading] = useState(false);
  const [error, setError] = useState(null);


  const Navigate = useNavigate();
  const location = useLocation();
  const data = location.state;


  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    setisloading(true)
    const response = await axios({
      url: "/Auth/fgverifyotp",
      method: "post",
      data: {
        otp,data
      },
    });
    const result = response.data;
        if (result.success) {
          setisloading(false);
          Navigate('/resetpassword',{state:data});
        } else {
          setisloading(false);
          setError(result.message);
          message.error(result.message).then(() => {
            setError(null);
          });
        }
  
  };

  return (
    <>
    <Navbar/>
    {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8"> */}
    
      <div className='mt-6'>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl text-violet-900 font-extrabold">OTP Verification</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
          
                  {isloading ? (
                    <div className="mb-4 mt-10 flex justify-center ">
                      <InfinitySpin width="200" color="#194569" />
                    </div>
                  ) : (
                    <div className="mt-10">
                      <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                      Verify
                      </button>
                    </div>
                  )}
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default FgOtp