import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../../redux/admin";
import { useDispatch } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import { message } from "antd";
import axios from "../../axios/axios";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
 

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      setloading(true);
      setError(null);
      const response = await axios({
        url: "/Auth/adminlogin",
        method: "post",
        data: { password, email },
      });

      const result = response.data;
      if (result.success) {
        localStorage.setItem("AdminToken", result.adminToken);
        // localStorage.setItem("userToken", JSON.stringify(result));
        dispatch(
          adminLogin({
            user: result.adminId,
            name: result.adiminname,
            token: result.adminToken,
          })
        );

        setloading(false);
        message.success("Login  successfully!");
        Navigate("/admin/user");
      } else {
        setloading(false);
        setError(result.message);
        message.error(result.message).then(() => {
          setError(null);
        });
      }
    } catch (error) {
      setloading(false);
      message.error("Somthing went wrong!");
    }
  };

  return (
    <div>
      <header className="w-full relative">
        <div className="bg-siteviolet  text-black  top-0 z-10 dark:text-white relative">
          <img
            className="w-full"
            src="../../../Images/purple-pattern.58c3dd91.svg"
            alt=""
          />
        </div>
        <div className="max-w-4xl absolute left-8 right-8  sm:top-5 md:top-40 lg:top-48  mx-auto bg-white px-9 flex justify-between items-center border text-left  z-10 rounded-md">
          <form
            className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl "
            onSubmit={handleLogin}
          >
            <div className="py-6">
              <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="w-full p-8 ">
                  <p className="text-2xl font-semibold text-center myb-4 text-violet-900">
                    ADMIN LOGIN
                  </p>
                  <p className="sm:text-2xl font-semibold text-left py-4 text-xl text-black">
                    Please Login
                  </p>
                  <p>
                    <div></div>
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <Link to="/">
                      <p className="text-xs text-center text-gray-500 uppercase hover:text-violet-600">
                        or login with email
                      </p>
                    </Link>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>

                  {error && (
                    <div className="error text-center w-full p-2 bg-red-600 bg-opacity-30 text-red-500">
                      {error}
                    </div>
                  )}
                  {isloading ? (
                    <div className="mb-4 mt-10 flex justify-center ">
                      <InfinitySpin width="200" color="#194569" />
                    </div>
                  ) : (
                    <div className="mt-8">
                      <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                        login
                      </button>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="border-b w-1/5 md:w-1/4"></span>
                    <Link to="/signup">
                      <div className="text-sm text-gray-500  hover:text-violet-600">
                        Don't have an account yet?Sign up
                      </div>
                    </Link>
                    <span className="border-b w-1/5 md:w-1/4"></span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default AdminLogin;
