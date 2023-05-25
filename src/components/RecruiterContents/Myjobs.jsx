import React from "react";
import { useState, useEffect } from "react";
import Reqnav from "../Navbar/Reqnav";
import { message } from "antd";
import Addjobmodal from "../Modal/Addjobmodal";
import Editjobmodal from "../Modal/Editjobmodal";
import Submodal from "../Modal/Submodal";
import Listmodal from "../Modal/Listmodal";
import moment from "moment";
import Arrowright from "../../lottiefiles/Arrowright.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { jobdata } from "../../apis/recuiterapi";
import { recuiterdata } from "../../apis/recuiterapi";

const Myjobs = () => {
  const [showModal, setshowModal] = useState(false);
  const [showsubModal, setsubshowModal] = useState(false);
  const [showeditModal, setshoweditModal] = useState(false);
  const [listModal, setlistModal] = useState(false);
  const [jobdatas, setJobdatas] = useState([]);
  const [SingleJobdata, setSingleJobdata] = useState({});
  const [Userdata, setUserdata] = useState({});
  const [Expiredate, setExpiredate] = useState({});
  const [checkexp, setCheckexp] = useState({});

  const token = localStorage.getItem("recruiterToken");
  const Navigate = useNavigate();

  //  const controllmodal=()=>{
  //   if(true){
  //     setsubshowModal(true)
  //   }else{
  //     setsubshowModal(true)
  //   }
  //  }

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await jobdata(token).then((res) => {
          setJobdatas(res.data.jobdata);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, []);

  const Edithandle = (data) => {
    setshoweditModal(true);
    setSingleJobdata(data);
  };

  const Listhandle = (data) => {
    setlistModal(true);
    setUserdata(data);
  };

  const controllmodal = async () => {
    if (token) {
      await recuiterdata(token).then((res) => {
        setExpiredate(res.data.recruiterdata[0].subscriptionexpirydate);
        const checksub = res.data.recruiterdata[0].subscription;
        setCheckexp(checksub);
        if (checksub) {
          setshowModal(true);
        } else {
          setsubshowModal(true);
        }
      });
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  };

  return (
    <div>
      <Reqnav />
      {/* {checkexp && <div className=" w-full flex justify-center bg-slate-300 text-sm py-1 font-bold text-green-600">
           <p>Your subscription plan expire on {"  "} {moment(Expiredate).format('DD MMM, YYYY')}</p>
          </div>} */}
      <div className="relative text-end">
        <div className="w-full flex flex-row bg-slate-100 justify-end text-black">
          <div className="mr-6 flex">
            <Lottie
              animationData={Arrowright}
              className="h-4 mt-3 md:mt-5 pr-2"
            />
            <button
              type="button"
              className="focus:outline-none text-white bg-siteviolet focus:ring-4 
              rounded-full md:text-lg text-sm md:px-10 px-5 md:py-2 font-bold   py-2 md:mr-2 md:my-2 my-1"
              onClick={() => {
                controllmodal();
              }}
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
      <Addjobmodal
        isVisible={showModal}
        onclose={() => {
          setshowModal(false);
        }}
      />
      <Submodal
        isVisible={showsubModal}
        onclose={() => {
          setsubshowModal(false);
        }}
      />
      <Listmodal
        isVisible={listModal}
        Userdata={Userdata}
        onclose={() => {
          setlistModal(false);
        }}
      />
      <Editjobmodal
        isVisible={showeditModal}
        SingleJobdata={SingleJobdata}
        onclose={() => {
          setshoweditModal(false);
        }}
      />
      <table className="w-4/5 m-auto   sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              NO
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Job title
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Posted on
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Catogory
            </th>

            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Salary
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Users
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Edit
            </th>
            <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {jobdatas.map((data, index) => (
            <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  NO
                </span>
                {index + 1}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Job title
                </span>
                {data.jobTitle}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Posted on
                </span>
                {moment(data.createdAt).format("DD MMM, YYYY")}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Catogory
                </span>
                {data.jobCategory}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Salary
                </span>
                {data.salaryRange}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                {/* <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Users</span>
              <div tabIndex={0} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
              collapse collapse-arrow border w-36 border-blue-700  bg-base-100 rounded-box">
  <div className="collapse-title text-base text-white text-violet-900 font-medium">
   List
  </div>
  <div className="collapse-content bg-white text-black">
  {data.users.map((items)=>(<p>{items?.userId?.first_name}</p>))}
  </div>
</div> */}
                <button
                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-6 rounded-full"
                  onClick={() => {
                    Listhandle(data);
                  }}
                >
                  view
                </button>

                {/* {data.users.map((item) => (
        <div key={data._id}>
          <button
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            type="button"
            onClick={() => toggleExpanded(data._id)}
            aria-expanded={expandedItems[data._id]}
            aria-controls={`collapseExample-${data._id}`}
          >
            {expandedItems[data._id] ? 'hide' : 'view'}
          </button>
          <div
            className={expandedItems[data._id] ? 'visible' : 'hidden'}
            id={`collapseExample-${data._id}`}
          >
            <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">
              <p>{item?.userId?.first_name}</p>
            </div>
          </div>
        </div>
      ))} */}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Edit
                </span>
              
                <button
                  className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-1 px-6 rounded-full"
                  onClick={() => {
                    Edithandle(data);
                  }}
                >
                  Edit
                </button>
              </td>
              {data?.isActive ? (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <div className="badge badge-secondary py-4 px-4 text-white">
                    Pending
                  </div>
                </td>
              ) : (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <div className="badge badge-accent py-4 px-4 text-white">
                    Approved
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Myjobs;
