import React from 'react'

import { useNavigate } from 'react-router-dom';

const Submodal = ({ isVisible,onclose}) => {

    const Navigate=useNavigate()

    if (!isVisible) return null;
    const handleClose = (e) => {
      if (e.target.id === "wrapper") onclose();
    };

  return (
    <div>
     
      <div
      id="wrapper"
      className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[400px] flex flex-col overflow-y-auto h-[600px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => {
            onclose();
          }}
        >
          x
        </button>
        <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
           
            <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Sorry, but it seems like you don't have an active subscription plan</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={()=>{Navigate('/recruiter/subscription')}}>
                   Subcription
                </button>
                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"  onClick={() => {
            onclose();
          }}>No, cancel</button>
            </div>
        </div>
    </div>
        </div>
       
      </div>
    </div>
  )
}

export default Submodal
