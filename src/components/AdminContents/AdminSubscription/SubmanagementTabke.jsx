import React, { useEffect, useState } from "react";
import moment from "moment";
import { message } from "antd";
import { Link } from "react-router-dom";
import { recruiterSub } from "../../../apis/adminapi";
import { Subcancel } from "../../../apis/adminapi";

const SubmanagementTabke = () => {
  const [subscription, setSubscription] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("AdminToken");

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await recruiterSub(token).then((res) => {
          setSubscription(res.data.reqsubscription);
        });
      })();
    }
  }, [refresh]);

  const handlecancel = (subId, reqId) => {
    const data = {
      subscription: subId,
      recrfuiter: reqId,
    };
    if (token) {
      (async function invoke() {
        await Subcancel(token, data).then((res) => {
          if (res.status === 200) {
            setRefresh(!refresh);
            message.success("Deleted successfully");
          }
        });
      })();
    }
  };

  return (
    <div>
      <table className="  w-full m-10 sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead>
          <tr className="bg-violet-800 ">
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              No
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Recruiter Name
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Email
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Subscription Type
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell">
              Expire Date
            </th>
            <th className="p-3 font-bold   text-white border-gray-300 hidden lg:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {subscription?.map((data, index) =>
            data.RecruiterId?.map((item, number) => (
              <tr
                key={number}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    NO
                  </span>
                  {index + 1}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Recruiter Name
                  </span>
                  {item?.concern_name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    E-mail
                  </span>
                  {item?.Email}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Subscription Type
                  </span>
                  {data?.subscriptioname}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Expire Date
                  </span>
                  {moment(item?.subscriptionexpirydate).format("DD MMM, YYYY")}
                </td>
                <td className="w-full lg:w-auto p-3 text-red-700 text-center border border-b  block lg:table-cell relative lg:static">
                  <a
                    href="#_"
                    class="inline-flex items-center justify-center h-9 px-6 font-medium tracking-wide text-white transition duration-200 bg-red-700 rounded-lg hover:bg-red-700 focus:shadow-outline focus:outline-none"
                    onClick={() => {
                      handlecancel(data?._id, item?._id);
                    }}
                  >
                    Cancel
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubmanagementTabke;
