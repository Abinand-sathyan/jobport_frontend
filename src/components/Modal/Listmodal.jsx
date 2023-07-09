import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { newConversation } from "../../apis/message";

const Listmodal = ({ isVisible, onclose, Userdata }) => {
  const [userdataId, setUsdataId] = useState({});

  const { recuiter } = useSelector((state) => state.recuiterLogin);
  const Navigate = useNavigate();

  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onclose();
    console.log("purify");
  };

  const handlesubmit = async (userId) => {
    try {
      (async function invoke() {
        await newConversation(userId, recuiter).then((res) => {
          if (res.status === 200) {
            Navigate("/messages");
          } else if (res.status === 201) {
            Navigate("/recruiter/messages");
          } else {
           
          }
        });
      })();
    } catch (err) {
    
    }
  };

  return (
    <div
      id="wrapper"
      className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[500px] flex flex-col overflow-y-auto h-[600px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => {
            onclose();
          }}
        >
          x
        </button>
        <div className="bg-white p-1 rounded-lg  overflow-y-auto">
          <div class="w-full text-sm font-medium  mx-auto my-6 flex flex-col    max-w-2xl text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <div
              aria-current="true"
              type="button"
              class="w-full px-4 py-2 font-semibold text-center  text-white bg-siteviolet border-b border-gray-200 rounded-t-lg focus:outline-none dark:bg-gray-800 dark:border-gray-600"
            >
              Candidates List
            </div>

            {Userdata.users.slice(1).map((items,index) => (
              <div key={index} className="flex justify-between my-2">
                <div
                  type="button"
                  class="w-full px-4 py-2 font-medium text-left border-b border-gray-200 hover:bg-gray-100   dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  {items?.userId?.first_name}
                </div>
                <button
                  className="bg-siteviolet hover:bg-siteviolet text-white font-bold  py-1 px-6 rounded-md"
                  onClick={() => {
                    Navigate("/recruiter/emplyerresume", {
                      state: {
                        userdataId: items?.userId?._id,
                        jobId: Userdata?._id,
                      },
                    });
                  }}
                >
                  view
                </button>
                <button
                  className="bg-siteviolet hover:bg-siteviolet text-white font-bold ml-1 py-1 px-6 rounded-md"
                  onClick={() => {
                    handlesubmit(items?.userId?._id);
                  }}
                >
                  message
                </button>
              </div>
            ))}

            {/* <div className='flex justify-between my-2'>
    <div type="button" class="w-full px-4 py-2 font-medium text-left border-b border-gray-200 hover:bg-gray-100   dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Settings
    </div>
    <button className="bg-siteviolet hover:bg-siteviolet text-white font-bold  py-1 px-6 rounded-md">
  view
</button>
    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listmodal;
