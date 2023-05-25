import React, { useState } from "react";
import { Link } from "react-router-dom";
const Adminrecruiter = (props) => {
  const { recruiterdata, reqBlock, requnBlock } = props;

  const [recruiterdetail, setrecruiterdetials] = useState([]);

  return (
    <div>
      <table className="ml-9 m-auto sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr className="bg-violet-800 ">
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              NO
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Recruiter name
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              E-mail
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Company Name
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Website
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Phone number
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Detials
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {recruiterdata.map((data, index) => (
            <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  NO
                </span>
                {index + 1}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Recruiter name
                </span>
                {data.concern_name}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  E-mail
                </span>
                {data.Email}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Company Name
                </span>
                {data.company_name}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Website
                </span>
                {data.website}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Phone number
                </span>
                {data.mobile_number}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Phone number
                </span>
                <label
                  htmlFor="my-modal-3"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 
              py-3 mr-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => setrecruiterdetials(data)}
                >
                  view
                </label>
              </td>

              {data?.block ? (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    type="button"
                    className="text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 
              py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => {
                      reqBlock(data._id);
                    }}
                  >
                    Block
                  </button>
                </td>
              ) : (
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    type="button"
                    className="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 
              py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => {
                      requnBlock(data._id);
                    }}
                  >
                    unblock
                  </button>
                </td>
              )}
            </tr>
          ))}
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
                        <li className="py-2">
                          Website:{recruiterdetail?.website}
                        </li>
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
        </tbody>
      </table>
    </div>
  );
};

export default Adminrecruiter;
