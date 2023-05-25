import React from "react";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from "moment";
import noresults from "../../../../lottiefiles/noresults.json";
import Lottie from "lottie-react";
import logo1 from "../../../../Assets/download.png";
import { SearchResult } from "../../../../apis/userapi";
import { jobapply } from "../../../../apis/userapi";
import Navbar from "../../../Navbar/Navbar";
import "firebase/storage";

function Searchjob() {
  const [jobdatas, setJobdatas] = useState([]);
  const [modaldata, setModaldata] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { user } = useSelector((state) => state.clientLogin);

  const Navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const param1 = query.get("param1");
  const param2 = query.get("param2");
  const param3 = query.get("param3");

  const SearchText = { catgory: param1, company: param2, location: param3 };

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await SearchResult(token, SearchText).then((res) => {
          const datas = res.data.SearchResult;
          if (datas.length === 0) {
            message.error("searching job not found");
            Navigate("/login");
          } else {
            setJobdatas(datas);
          }
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/login");
    }
  }, [refresh]);

  const applyjob = (jobId) => {
    if (token) {
      jobapply(jobId, token);
      setRefresh(!refresh);
      message.success("Job Added succesfully");
    }
  };
  return (
    <div>
      <Navbar />
      {jobdatas.length > 0 ? (
        <div
          className="jobContainer flex gap-10 justify-center flex-wrap items-center
    py-10"
        >
          {jobdatas.map((n,index) => {
            return (
              <div
              key={index} className="group group/item singleJob w-[250PX] p-[20px] bg-white rounded-[10px]
      hover:bg-siteviolet shadow-2xl shadow-greyIsh-400/700 hover:shadow-lg"
              >
                <span className="flex justify-between items-center gap-4">
                  <h1 className="text-[16px] font-semibold text-black group-hover:text-white whitespace-nowrap">
                    {n.jobCategory}
                  </h1>
                </span>
                <h6 className="text-[#ccc] text-start">{n.location}</h6>
                <div className="overflow-y-auto h-[100px]">
                  <p
                    className="text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px]
        group-hover:text-white"
                  >
                    {n.jobDiscription}
                  </p>
                </div>
                <div className="company flex items-center gap-2">
                  <img src={logo1} alt="Company Logo" className="w-[15%]" />
                  <span className="text-[14px] py-[1rem] block group-hover:text-white">
                    {n.companyname}
                  </span>
                </div>

                <label
                  htmlFor="my-modal-3"
                  className=" border-[2px] rounded-[10px] block p-[10px] w-full text-[14px]
        font-semibold text-black bg-white"
                  onClick={() => {
                    setModaldata(n);
                  }}
                >
                  Full Details
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <Lottie animationData={noresults} className="h-[25rem] mt-10" />
      )}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <section className="modal">
        <div className="modal-box h-[40rem] max-w-2xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2 "
          >
            ✕
          </label>
          <div className="flex">
            <div className="">
              <img
                className="rounded-lg object-cover w-[15rem] h-[15rem]"
                src={modaldata.image}
                alt=""
              />
            </div>
            <div className="text-left px-8">
              <h1 className="text-sm md:text-xl text-blue-500 lg:text-2xl font-bold">
                {modaldata.jobCategory}
              </h1>
              <div className="py-4 text-emerald-900 font-semibold">
                <p>Company Name: {modaldata.companyname} </p>
                <p>Location:{modaldata.location}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                Job description
              </h1>
              <p>{modaldata.jobDiscription}</p>
            </div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                Responsible
              </h1>
              <p>{modaldata.responsibilities}</p>
            </div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                Qualification
              </h1>
              <div>{modaldata.jobQualification}</div>
            </div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                Job Summary
              </h1>
              <div>
                <ul className="font-semibold text-red-700 py-4">
                  <li className="py-2">
                    Published on:
                    {moment(modaldata.createdAt).format("DD MMM, YYYY")}
                  </li>
                  <li className="py-2">Vaccancy:{modaldata.vaccancy}</li>
                  <li className="py-2">Salary:{modaldata.salaryRange}</li>
                  <li className="py-2">Location:{modaldata.location}</li>
                  <li className="py-2">Work Type:{modaldata.jobType}</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              {/* {modaldata.users.map((item)=>(
                    <div>jjjj</div>
                  ))} */}
              <button
                className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                onClick={() => {
                  applyjob(modaldata._id);
                }}
              >
                Apply Now
              </button>
            </div>
            {/* <h1 className='font-semibold'>{moment(date).format('DD MMM, YYYY')}</h1>
                     <h1>{ moment(date).format('h:mm A')}</h1> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Searchjob;
