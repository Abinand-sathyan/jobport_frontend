import React from "react";
import { useState } from "react";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../axios/axios";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { recuiterLogin } from "../../redux/recruiter";

const Reqsignup = () => {
  const [errors, setErrors] = useState({});
  const [isloading, setisloading] = useState(false);
  const [error, setError] = useState(null);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const validateField = (data) => {
    const errors = {};

    if (!data.concername.trim()) {
      errors.concername = "concern name is required";
    }

    if (!data.companyname.trim()) {
      errors.companyname = "company name is required";
    }

    if (!data.tagline.trim()) {
      errors.tagline = "tagline name is required";
    }

    if (!data.discription.trim()) {
      errors.tagline = "discription is required";
    }

    if (!data.password) {
      errors.password = "passward is required";
    } else if (data.password.length < 6) {
      errors.password = "password must be greater than 6 character";
    }

    if (!data.cpassword) {
      errors.cpassword = "confirm password is required";
    } else if (data.password !== data.cpassword) {
      errors.password = "password not same";
    }

    if (!data.Mnumber) {
      errors.Mnumber = "mobile number is required";
    }

    if (!data.cimage.name) {
      errors.cimage = "company image is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlesignup = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      concername: data.get("concername"),
      companyname: data.get("companyname"),
      tagline: data.get("tagline"),
      website: data.get("website"),
      Email: data.get("Email"),
      password: data.get("password"),
      discription: data.get("discription"),
      Cpassword: data.get("Cpassword"),
      Mnumber: data.get("Mnumber"),
      cimage: data.get("cimage"),
    };

    try {
      if (validateField(data)) {
        setisloading(true);
        setError(null);
        if (data.cimage.name) {
          const date = Date.now();
          const rand = Math.random();
          const image = data.cimage;
          const imageRef = ref(
            storage,
            `/companyImages/${date}${rand}_${image?.name}`
          );

          const toBase64 = (image) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            }).catch((err) => {
             
            });
          const imgBase = await toBase64(image);

          await uploadString(imageRef, imgBase, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            data.cimage = downloadURL;
          });
        } else {
          data.cimage = "";
        }

        const response = await axios({
          url: "/Auth/recruiterSignup",
          method: "post",
          data: { data },
        });
        const result = response.data;
        if (result.success) {
          setisloading(false);
          message.success("Signup successfully!");
          Navigate("/recruiter/login");
        } else {
          setisloading(false);
          setError(result.message);
          message.error(result.message).then(() => {
            setError(null);
          });
        }
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
            onSubmit={handlesignup}
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
                      Concern name
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="concername"
                      id="concername"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Company Name
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="companyname"
                      id="companyname"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tagline
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="tagline"
                      id="tagline"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Website
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      name="website"
                      id="website"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-4 px-4 block w-full appearance-none"
                      type="textarea"
                      name="discription"
                      id="discription"
                    ></textarea>
                  </div>

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
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company image
                      </label>
                    </div>
                    <input
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="file"
                      name="cimage"
                      id="cimage"
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

export default Reqsignup;
