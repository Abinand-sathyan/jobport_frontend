import React from "react";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const AdminJobstable = (props) => {
  const { approve, jobsdata, pending } = props;

  const [modaldata, setModaldata] = useState([]);

  return (
    <div>
      <table className="ml-9 m-auto sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr className="bg-violet-800 ">
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              NO
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Company Name
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Job titile
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Posted On
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Category
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Salary range
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Details
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {jobsdata.map((data, index) => (
            <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  NO
                </span>
                {index + 1}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Company Name
                </span>
                {data.companyname}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Job titile
                </span>
                {data.jobTitle}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Posted On
                </span>
                {moment(data.createdAt).format("DD MMM, YYYY")}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Category
                </span>
                {data.jobCategory}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Salary range
                </span>
                {data.salaryRange}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <label
                  htmlFor="my-modal-3"
                  className=" border-[2px] rounded-[10px] block p-[10px] w-full text-[14px]
          font-semibold text-black bg-white"
                  onClick={() => {
                    setModaldata(data);
                  }}
                >
                  Full Details
                </label>
              </td>

              {data?.isActive ? (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-6 rounded-full"
                    onClick={() => {
                      approve(data._id);
                    }}
                  >
                    Pending
                  </button>
                </td>
              ) : (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-6 rounded-full"
                    onClick={() => {
                      pending(data._id);
                    }}
                  >
                    Approved
                  </button>
                </td>
              )}
            </tr>
          ))}
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
                    src={modaldata?.image}
                    alt=""
                  />
                </div>
                <div className="text-left px-8">
                  <h1 className="text-sm md:text-xl text-blue-500 lg:text-2xl font-bold">
                    {modaldata?.jobCategory}
                  </h1>
                  <div className="py-4 text-emerald-900 font-semibold">
                    <p>Company Name: {modaldata?.companyname} </p>
                    <p>Location:{modaldata?.location}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-left">
                  <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                    Job description
                  </h1>
                  <p>{modaldata?.jobDiscription}</p>
                </div>
                <div className="text-left">
                  <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                    Responsible
                  </h1>
                  <p>{modaldata?.responsibilities}</p>
                </div>
                <div className="text-left">
                  <h1 className="text-sm md:text-lg text-blue-800 lg:text-xl font-semibold">
                    Qualification
                  </h1>
                  <div>{modaldata?.jobQualification}</div>
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
                      <li className="py-2">Vaccancy:{modaldata?.vaccancy}</li>
                      <li className="py-2">Salary:{modaldata?.salaryRange}</li>
                      <li className="py-2">Location:{modaldata?.location}</li>
                      <li className="py-2">Work Type:{modaldata?.jobType}</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8">
                  {/* {modaldata?.isActive?<button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={()=>{approve(modaldata._id)}}>
                  Click to Approve
                    </button>:
                    <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={()=>{pending(modaldata._id)}}>
                    Click to Pending
                    </button>} */}
                </div>
              </div>
            </div>
          </section>
          {/* <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
                Squary
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                Schweden
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">active</span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
                <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
            </td>
        </tr> */}
          {/* <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
				ghome
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                Switzerland
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                <span className="rounded bg-yellow-400 py-1 px-3 text-xs font-bold">inactive</span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
                <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
            </td>
        </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobstable;
