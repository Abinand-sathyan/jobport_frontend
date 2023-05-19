import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../findjob/FooterDiv/Footer";
import { Recruiter } from "../../../apis/userapi";
import { useSelector } from "react-redux";
import { newConversation } from "../../../apis/message";

const Userhome = () => {
  const [recruiter, setrecruiterdatas] = useState([]);
  const [recruiterdetail, setrecruiterdetials] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const { user } = useSelector((state) => state.clientLogin);
  const Navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (token) {
      (async function invoke() {
        await Recruiter(token).then((res) => {
          setrecruiterdatas(res.data.recruiters);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/login");
    }
  }, [refresh]);

  const handlesubmit = async (recruiterId) => {
    try {
      (async function invoke() {
        await newConversation(recruiterId, user).then((res) => {
          if (res.status === 200) {
            Navigate("/messages");
          } else if (res.status === 201) {
            Navigate("/messages");
          } else {
          }
        });
      })();
    } catch (err) {}
  };

  return (
    <div>
      <Navbar />

      <div
        className="jobContainer flex gap-10 justify-center flex-wrap items-center
        py-10"
      >
        {recruiter.map((data) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={data?.company_image}
                alt="Shoes"
                className="rounded-xl h-[15rem]"
              />
            </figure>
            <div className="card-body  text-left">
              <h2 className="card-title font-extrabold text-xl ">
                {data?.concern_name}
              </h2>
              <h2 className="card-title font-bold text-gray-700 text-lg ">
                {data?.company_name}
              </h2>
              <h4 className="card-title font-bold text-green-700 text-sm ">
                {data?.tagline}
              </h4>
              <p class="truncate h-6 overflow-hidden">{data?.discription}</p>
              <div className="flex justify-between">
                <div className="card-actions ">
                  {/* <button className="btn btn-primary bg-siteviolet">view</button> */}
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-primary bg-siteviolet py-1"
                    onClick={() => setrecruiterdetials(data)}
                  >
                    view
                  </label>
                </div>
                <div className="card-actions ">
                  <button
                    className="btn btn-primary bg-siteviolet py-1"
                    onClick={() => {
                      handlesubmit(data?._id);
                    }}
                  >
                    message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex">
            <div className="">
              <img
                className="rounded-lg object-cover w-[15rem] h-[15rem]"
                src={recruiterdetail?.company_image}
                alt=""
              />
            </div>
            <div className="text-left px-8">
              <h1 className="text-sm md:text-xl text-blue-500 lg:text-2xl font-bold">
                {recruiterdetail?.concern_name}
              </h1>
              <div className="py-4 text-emerald-900 font-semibold">
                <p>company name:{recruiterdetail?.company_name} </p>
                <p>Email:{recruiterdetail?.Email}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                Description
              </h1>
              <p>{recruiterdetail?.discription}</p>
              {/* </div>
          <div className='text-left'>
              <h1 className='text-sm md:text-lg text-blue-800 lg:text-xl font-semibold'>Responsible</h1>
              <p>
              {modaldata?.responsibilities}
              </p>
          </div>
          <div className='text-left'>
              <h1 className='text-sm md:text-lg text-blue-800 lg:text-xl font-semibold'>Qualification</h1>
              <div>
              {modaldata?.jobQualification}
              </div> */}
            </div>
            <div className="text-left">
              <h1 className="text-sm md:text-lg text-black-800 lg:text-lg font-semibold">
                Other information
              </h1>
              <div>
                <ul className="font-semibold text-red-700 ">
                  <li className="py-2"></li>
                  <Link>
                    <li className="py-2">Website:{recruiterdetail?.website}</li>
                  </Link>
                  {/* <li className='py-2'>Tagline:{recruiterdetail?.tagline}</li> */}
                  <li className="py-2">
                    Contact Number:{recruiterdetail?.mobile_number}
                  </li>
                  {/* <li className='py-2'>Work Type:{modaldata?.jobType}</li> */}
                </ul>
              </div>
            </div>
            <div className="mt-8"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userhome;
