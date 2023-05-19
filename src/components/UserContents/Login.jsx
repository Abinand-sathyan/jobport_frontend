/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/user";
import { message } from "antd";
import Navbar from "../Navbar/Navbar";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../axios/axios";

const Loginpage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const VerifyEmail = async (datas) => {
    try {
      const response = await axios({
        url: "/Auth/googleAuth",
        method: "post",
        data: {
          datas,
        },
      });

      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.userToken);

        Navigate("/findjobs");
      }
    } catch (error) {
      message.error("something wrong!!");
    }
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      setloading(true);
      setError(null);
      const response = await axios({
        url: "/Auth/userLogin",
        method: "post",
        data: { password, email },
      });

      const result = response.data;
      if (result.success) {
        localStorage.setItem("userToken", response.data.userToken);
        // localStorage.setItem("userToken", JSON.stringify(result));
        dispatch(
          userLogin({
            user: result.userid,
            name: result.username,
            token: result.userToken,
          })
        );

        setloading(false);
        message.success("Login  successfully!");
        Navigate("/findjobs");
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
      <Navbar />
      <header className="w-full relative">
        <div className="bg-siteviolet  text-black  top-0 dark:text-white relative">
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
                  <p className="text-2xl font-semibold text-center myb-4 text-siteviolet">
                    Welcome back!
                  </p>
                  <p className="sm:text-2xl font-semibold text-left py-4 text-xl text-black">
                    Please Login
                  </p>
                  <p>
                    <LoginSocialGoogle
                      client_id={
                        "191716981992-rj9q7uppalat6ula1paomes1e4kvo786.apps.googleusercontent.com"
                      }
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={VerifyEmail}
                      onReject={(err) => {
                      
                      }}
                    >
                      <GoogleLoginButton className="w-full" />
                    </LoginSocialGoogle>
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
                      <Link to="/verifynumber">
                        <p className="text-xs text-cyan-400">
                          Forget Password?
                        </p>
                      </Link>
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
};

export default Loginpage;
