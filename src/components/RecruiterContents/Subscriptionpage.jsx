import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Reqnav from "../Navbar/Reqnav";
import { message } from "antd";
import Footer from "../UserContents/findjob/FooterDiv/Footer";
import { useNavigate } from "react-router-dom";
import { subscriptiondata } from "../../apis/recuiterapi";
import { completePayment } from "../../apis/recuiterapi";

const Subscriptionpage = () => {
  const [subdata, setSubdata] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Price, setprice] = useState(null);

  const Navigate = useNavigate();
  const token = localStorage.getItem("recruiterToken");

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await subscriptiondata(token).then((res) => {
          setSubdata(res.data.subscriptiondata);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/login");
    }
  }, []);

  const handleopen = (id, amount) => {
    setSelectedItem(id);
    setprice(amount);
  };

  const handlpay = (token, selectedItem) => {
    completePayment(token, selectedItem).then((res) => {
      if (res.data.success) {
        message.success("Subscription added Successfully");
        Navigate("/recruiter/myjobs");
      } else {
        message.error("You have Already a subscription plan");
        Navigate("/recruiter/myjobs");
      }
    });
  };

  return (
    <div>
      <Reqnav />
      <section className="bg-siteviolet  text-black h-full mx-8 rounded-lg top-9 dark:text-white relative">
        <div className="text-center">
          <div
            className="max-w-6xl mx-auto my-auto  m:top-10 md:top-16 h-20 lg:top-24 font-bold text-4xl sm:text-left text-indigo-700
            flex justify-between items-center border  z-10 rounded-md border-none"
          >
            <h1 className="mx-auto my-auto">
              Subscription
              <span class="text-slate-300 dark:text-indigo-300"> Plans </span>{" "}
              For You
            </h1>
          </div>
        </div>
        <div
          className="jobContainer flex gap-10 justify-center flex-wrap items-center
      py-10"
        >
          {subdata.map((data,index) => {
            return (
              <div key={index}
                className="group group/item singleJob w-[350px] p-[20px] h-full bg-white rounded-[10px]
        shadow-lg  hover:shadow-lg"
              >
                <div class=" px-4 py-3 ">
                  <h3 className="text-2xl text-opacity-75 font-Proxima uppercase leading-6  font-bold text-gray-900">
                    {data.subscriptioname}
                  </h3>
                  <p
                    className="text-[13px] border-indigo-800 pt-[20px]  border-t-[4px] mt-[20px]
          group-hover:text-white"
                  ></p>
                </div>

                <div class=" px-4 py-3 ">
                  <h3 className="text-4xl  font-Proxima leading-6  font-extrabold text-gray-900">
                    ₹ {data.subscription_fees}
                  </h3>

                  <div class=" px-4 py-4 ">
                    <h3 className="text-lg  font-semibold  text-siteviolet leading-6">
                      {data.duration}
                    </h3>
                  </div>

                  <p
                    className="text-[13px] text-[#959595] pt-[20px] border-t-[3px] mt-[20px]
          group-hover:text-white mx-6"
                  >
                    <ul class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
                      <li class="flex items-center space-x-3">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>All Features</span>
                      </li>
                      <li class="flex items-center space-x-3">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>Chat Support</span>
                      </li>
                      <li class="flex items-center space-x-3">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>Add {data.limits} jobs</span>
                      </li>
                    </ul>
                  </p>
                </div>

                <button
                  htmlFor="my-modal-3"
                  className=" border-[2px] rounded-[10px] block p-[10px] w-full text-[14px]
          font-semibold text-white bg-siteviolet cursor-pointer"
                  onClick={() => handleopen(data._id, data.subscription_fees)}
                >
                  Make payment
                </button>
                {selectedItem === data._id && (
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AZo0lCt1TirrRQNpBt40pQAc1ZNpcv0PpBbSnvAdr_rag85gB-0Zab9Lq9GJrBoYPpmlpLeUcO9ml57Z",
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: "blue",
                        shape: "pill",
                        label: "pay",
                        height: 40,
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: Price,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((res) => {
                          handlpay(token, selectedItem);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <div>
        <h1 className="text-siteviolet text-[25px] py-[5rem] pb-[3rem] font-extrabold text-left ml-10 w-[400px] block">
          Unlock exclusive benefits with our subscription plans!
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Subscriptionpage;
