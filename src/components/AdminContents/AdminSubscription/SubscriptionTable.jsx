import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscriptiondata } from "../../../apis/adminapi";

const SubscriptionTable = () => {
  const [subscription, setSubscription] = useState([]);

  const token = localStorage.getItem("AdminToken");

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await subscriptiondata(token).then((res) => {
          setSubscription(res.data.subscriptiondata);
        });
      })();
    }
  }, []);

  return (
    <div>
      <div className="w-full my-10 mx-10">
        {/* <Link
          to="/admin/addsubscription"
          class="inline-flex items-center rounded-lg font-bold justify-center h-9 px-6 py-6 tracking-wide w-full text-white transition duration-200 bg-violet-800  hover:bg-violet-800 focus:shadow-outline focus:outline-none"
        >
          Add Subsription
        </Link> */}
      </div>
      <div className="w-full my-10 mx-10">
        <Link
          to="/admin/managesubscription"
          class="inline-flex items-center rounded-lg font-bold justify-center h-9 px-6 py-6 tracking-wide w-full text-white transition duration-200 bg-violet-800  hover:bg-violet-800 focus:shadow-outline focus:outline-none"
        >
        Recruiter subscription management
        </Link>
      </div>
      <table className="  w-full m-10 sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr className="bg-violet-800 ">
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              No
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Job posting limits
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Subscription Type
            </th>
            
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Duration of subscription
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Subscription fee
            </th>
            {/* <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell"></th> */}
          </tr>
        </thead>
        <tbody>
          {subscription.map((data, index) => (
            <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  NO
                </span>
                {index + 1}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Job posting limits
                </span>
                {data?.limits}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Subscrition Type
                </span>
                {data?.subscriptioname}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  E-mail
                </span>
                {data?.duration}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Company Name
                </span>
                {data?.subscription_fees}
              </td>
              {/* <td className="w-full lg:w-auto p-3 text-red-700 text-center border border-b  block lg:table-cell relative lg:static">
                <a
                  href="#_"
                  class="inline-flex items-center justify-center h-9 px-6 font-medium tracking-wide text-white transition duration-200 bg-red-700 rounded-lg hover:bg-red-700 focus:shadow-outline focus:outline-none"
                >
                  Delete
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
