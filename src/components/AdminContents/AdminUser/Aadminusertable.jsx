import React from "react";
import { Link } from "react-router-dom";

const Aadminusertable = (props) => {
  const { userdata, userBlock, userunBlock } = props;

  return (
    <div>
      <table className="w-4/5 m-auto   sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr className="bg-violet-800 ">
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              NO
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Seeker Name
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              E-mail
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Phone number
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((data, index) => (
            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  NO
                </span>
                {index + 1}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Seeker Name
                </span>
                {data.first_name}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  E-mail
                </span>
                {data.email_address}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Phone number
                </span>
                {data.mobile_number}
              </td>

              {data?.block ? (
                <td className="w-full lg:w-auto p-4 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-6 rounded-full"
                    onClick={() => {
                      userBlock(data._id);
                    }}
                  >
                    block
                  </button>
                </td>
              ) : (
                <td className="w-full lg:w-auto p-4 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <button
                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-6 rounded-full"
                    onClick={() => {
                      userunBlock(data._id);
                    }}
                  >
                    Unblock
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Aadminusertable;
