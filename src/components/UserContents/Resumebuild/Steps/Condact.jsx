import React from "react";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

const Condact = () => {
  const [isloading, setisLoading] = useState(false);
  return (
    <div>
      <form className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl ">
        <div className="py-6">
          <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div className="w-full p-8 ">
              <p className="text-2xl font-semibold text-center myb-4 text-siteviolet">
                Add Condact Information
              </p>

              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="firstname"
                  name="firstname"
                ></input>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  {/* <Link to="/forgetpassword">
                        <p className="text-xs text-cyan-400">
                          Forget Password?
                        </p>
                      </Link> */}
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="password"
                  name="password"
                ></input>
              </div>

              {isloading ? (
                <div className="mb-4 mt-10 flex justify-center ">
                  <InfinitySpin width="200" color="#194569" />
                </div>
              ) : (
                <div className="mt-8">
                  <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                    Save my condact
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Condact;
