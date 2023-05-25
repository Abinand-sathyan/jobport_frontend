import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { resumedata } from "../../apis/recuiterapi";
import Footer from "../UserContents/findjob/FooterDiv/Footer";
import Reqnav from "../../components/Navbar/Reqnav";
import profilephoto from "../../Assets/profilephoto.jpg";
import { TfiBag } from "react-icons/tfi";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { singlejobdata } from "../../apis/recuiterapi";
import { hirecandidates } from "../../apis/recuiterapi";

const Userdetails = ({ worker }) => {
  const [userdatas, setUserdata] = useState({});
  const [resumedatas, setResumedata] = useState([]);
  const [checkhired, setCheckhired] = useState(false);

  const state = useLocation();

  const myData = state.state.userdataId;
  const jobid = state.state.jobId;

  const Navigate = useNavigate();

  const token = localStorage.getItem("recruiterToken");

  const data = {
    usererId: myData,
    jobId: jobid,
  };
  useEffect(() => {
    if (token) {
      (async function invoke() {
        await resumedata(token, myData).then((res) => {
          setResumedata(res?.data?.resumedata);
          setUserdata(res?.data?.resumedata[0]?.userId);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await singlejobdata(token, data).then((res) => {
          if (res.data.success) {
            setCheckhired(true);
          }
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, []);

  const submithire = async (userid) => {
    const jobanduserId = {
      userid,
      jobid,
    };
    await hirecandidates(token, jobanduserId).then((res) => {
      if (res.data.success) {
        message.success("hire candidate successfully");
        Navigate("/recruiter/myjobs");
      } else {
        message.error("cannot hire  successfully");
        Navigate("/recruiter/myjobs");
      }
    });
  };

  return (
    <div>
      <Reqnav />

      <article className=" rounded-xl border border-gray-700 bg-siteviolet max-w-xl my-20  h-full inset-0 m-auto p-4">
        <div className="flex items-center gap-4">
          <img
            alt="Developer"
            src={resumedatas[0]?.employeeimage}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-white">
              {userdatas.first_name} {userdatas.last_name}
            </h3>
            <div className="flow-root">
              <ul className="-m-1 flex-col flex-wrap">
                <li className="p-1 leading-none">
                  <p className="text-xs font-medium text-gray-300">
                    {" "}
                    {userdatas.email_address}{" "}
                  </p>
                </li>
                <li className="p-1 leading-none">
                  <p
                    href="#"
                    className="text-xs text-left font-medium text-gray-300"
                  >
                    {" "}
                    {userdatas?.mobile_number}{" "}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          <li>
            <div
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-900"
            >
              <strong className="font-bold text-white text-xl text-left">
                Education Details
              </strong>
              <p className="mt-1 text-xs font-medium text-left text-gray-300 ">
                <dl class="max-w-md text-slate-100 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div class="flex flex-col py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Qualification
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.degree}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Degree
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.degreename}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Discription
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.edudescription}
                    </dd>
                  </div>
                </dl>
              </p>
            </div>
          </li>
          <li>
            <div
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-900"
            >
              <strong className="font-bold text-white text-xl text-left">
                Experience
              </strong>
              <p className="mt-1 text-xs font-medium text-left text-gray-300 ">
                <dl class="max-w-md text-slate-100 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div class="flex flex-col py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Comapany Name
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.cname}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Job title
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.Jobtitle}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      jobtype
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.jobtype}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      experience
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.experience} Year
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      country,state,city
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {resumedatas[0]?.country},{resumedatas[0]?.state},
                      {resumedatas[0]?.city}
                    </dd>
                  </div>
                </dl>
              </p>
            </div>
          </li>

          <li>
            <div
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-900"
            >
              <strong className="font-bold text-white text-xl text-left">
                Contact Details
              </strong>
              <p className="mt-1 text-xs font-medium text-left text-gray-300 ">
                <dl class="max-w-md text-slate-100 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div class="flex flex-col py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Email
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {userdatas.email_address}
                    </dd>
                  </div>
                  <div class="flex flex-col border-none py-2">
                    <dt class="mb-1 text-white md:text-base dark:text-gray-400">
                      Mobile Number
                    </dt>
                    <dd class="text-sm text-gray-400">
                      {userdatas?.mobile_number}
                    </dd>
                  </div>
                </dl>
              </p>
            </div>
            {checkhired ? (
              <div className="flex my-4 mx-4  items-center justify-between">
                <button
                  type="button"
                  class=" w-full text-siteviolet bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-extrabold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
       dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Hired
                </button>
              </div>
            ) : (
              <div className="flex my-4 mx-4  items-center justify-between">
                <button
                  type="button"
                  class=" w-full text-siteviolet bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-extrabold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
       dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => {
                    submithire(userdatas._id);
                  }}
                >
                  Hire
                </button>
              </div>
            )}
          </li>
        </ul>
      </article>

      <Footer />
    </div>
  );
};

export default Userdetails;
