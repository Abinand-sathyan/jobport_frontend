import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { hiredcandidates } from "../../apis/recuiterapi";
import Footer from "../UserContents/findjob/FooterDiv/Footer";
import Navbar from "../Navbar/Reqnav";
import noresults from "../../lottiefiles/noresults.json";
import Lottie from "lottie-react";

const Hiredcandidates = () => {
  const [jobhired, setJobhired] = useState([]);

  const token = localStorage.getItem("recruiterToken");
  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await hiredcandidates(token).then((res) => {
          setJobhired(res.data.hiredcandidates);
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

      {jobhired ? (
        <table className="w-4/5 m-auto   sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead>
            <tr>
              {/* <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">No</th> */}
              <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
                candidate name
              </th>
              <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
                Contact number
              </th>
              <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
                email
              </th>

              <th className="p-3 font-bold  bg-siteviolet text-slate-200 border-gray-300 hidden lg:table-cell">
                jobtitle
              </th>
            </tr>
          </thead>
          <tbody>
            {jobhired?.map((data, index) =>
              data.hired?.map((items,number) => (
                <tr key={number} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  {/* <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
         <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">NO</span>
         {number+1}
     </td> */}
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      candidate name
                    </span>
                    {items.first_name} {items.last_name}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      contact number
                    </span>
                    {items?.mobile_number}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      email
                    </span>
                    {items?.email_address}
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      job title
                    </span>
                    {data?.jobCategory}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col">
          <Lottie animationData={noresults} className="h-[25rem] mt-10" />
          <strong classname="text-2xl text-white sm:text-xl ">
            There is no hired candidates!!!
          </strong>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Hiredcandidates;
