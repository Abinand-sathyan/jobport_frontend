import React from "react";
import { useState } from "react";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../axios/axios";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [isloading, setisloading] = useState(false);
  const [error, setError] = useState(null);

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
        Navigate("/home");
      }
    } catch {}
  };

  const validateaField = (data) => {
    let errors = {};

    if (!data.Fname.trim()) {
      errors.FName = "First name is required";
    }

    if (!data.Lname.trim()) {
      errors.LName = "last name is required";
    }

    // if (!data.Email.trim()) {
    //   errors.Email = "email is required";
    // } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   errors.Email = "invalid email address";
    // }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password !== data.Cpassword) {
      errors.confirmPassword = "password not matched";
    }

    if (!data.Mnumber) {
      errors.Mnumber = "Number required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (events) => {
    events.preventDefault();
    let data = new FormData(events.currentTarget);

    data = {
      Fname: data.get("Fname"),
      Lname: data.get("Lname"),
      Email: data.get("Email"),
      password: data.get("password"),
      Cpassword: data.get("Cpassword"),
      Mnumber: data.get("Mnumber"),
    };

    try {
      if (validateaField(data)) {
        setisloading(true);
        const response = await axios({
          url: "/Auth/userSignup",
          method: "post",
          data: {
            data,
          },
        });
        const result = response.data;
        if (result.success) {
          setisloading(false);
          Navigate("/otpverification",{state:data});
        } else {
          setisloading(false);
          setError(result.message);
          message.error(result.message).then(() => {
            setError(null);
          });
        }
      } else {
   
      }
    } catch (error) {
      setisloading(false);
      message.error("Somthing went wrong!");
    }
  };
  return (
    <div>
      <Navbar />
      <header className="w-full relative">
        <div className="bg-siteviolet  text-black  top-0 z-10 dark:text-white relative">
          <img
            className="w-full"
            src="../../../Images/purple-pattern.58c3dd91.svg"
            alt=""
          />
        </div>
        <div className="max-w-4xl absolute left-8 right-8  sm:top-15 md:top-40 lg:top-48  mx-auto bg-white px-9 flex justify-between items-center border text-left  z-10 rounded-md">
          <form
            className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl "
            onSubmit={handleSignup}
          >
            <div className="py-6">
              <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="w-full p-8 ">
                  <p className="text-2xl font-semibold text-center mb-4 text-siteviolet">
                    Welcome back!
                  </p>
                  <p className="sm:text-2xl font-semibold text-left py-4 text-xl text-black">
                    Create An Account
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
                      First Name
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="Fname"
                      id="Fname"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="Lname"
                      id="Lname"
                    ></input>
                  </div>
                  {errors.FName && errors.LName ? (
                    <span className="error text-red-400">
                      first name and last name are required
                    </span>
                  ) : (
                    <div>
                      {errors.FName && (
                        <span className="error text-red-400">
                          {errors.FName}
                        </span>
                      )}
                      {errors.SName && (
                        <span className="error text-red-400">
                          {" "}
                          {errors.LName}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="email"
                      name="Email"
                      id="Email"
                    ></input>
                  </div>
                  {errors.Email && (
                    <span className="error text-red-400">{errors.Email}</span>
                  )}
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                    </div>
                    <input
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="password"
                      name="password"
                      id="password"
                    ></input>
                  </div>
                  {errors.password && (
                    <span className="error text-red-400">
                      {errors.password}
                    </span>
                  )}
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conform Password
                      </label>
                    </div>
                    <input
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="password"
                      name="Cpassword"
                      id="Cpassword"
                    ></input>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error text-red-400">
                      {errors.confirmPassword}
                    </span>
                  )}
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone number
                      </label>
                    </div>
                    <input
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="number"
                      name="Mnumber"
                      id="Mnumber"
                    ></input>
                  </div>
                  {errors.Mnumber && (
                    <span className="error text-red-400">{errors.Mnumber}</span>
                  )}
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
                        Sign up
                      </button>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="border-b w-1/5 md:w-1/4"></span>
                    <Link to="/login">
                      <div className="text-sm text-gray-500   hover:text-violet-600">
                        Have an account?Login
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

export default Signup;
