import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { message } from "antd";
import Footer from "../findjob/FooterDiv/Footer";
import moment from "moment";
import { appliedjobs } from "../../../apis/userapi";
import { useNavigate, Link } from "react-router-dom";
import logo1 from "../../../Assets/download.png";

const Appliedjobs = () => {
  const [appliedjobss, setAplliedjobs] = useState([]);
  const [modaldata, setModaldata] = useState([]);

  const token = localStorage.getItem("userToken");
  const Navigate = useNavigate();
  useEffect(() => {
    if (token) {
      (async function invoke() {
        await appliedjobs(token).then((res) => {
          setAplliedjobs(res.data.jobs);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <body>
        <div
          className="jobContainer flex gap-10 justify-center flex-wrap items-center
      py-10"
        >
          {appliedjobss.map((n) => {
            return (
              <div
                className="group group/item singleJob w-[250PX] p-[20px] bg-white border border-violet-600 rounded-[10px]
        hover:bg-siteviolet shadow-lg shadow-greyIsh-600/700 hover:shadow-2xl"
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
                <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Applied
                </button>
              </div>
              {/* <h1 className='font-semibold'>{moment(date).format('DD MMM, YYYY')}</h1>
                       <h1>{ moment(date).format('h:mm A')}</h1> */}
            </div>
          </div>
        </section>
      </body>
      <Footer />
    </div>
  );
};

export default Appliedjobs;
