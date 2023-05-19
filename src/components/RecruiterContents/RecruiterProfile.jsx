import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import Navbar from "../Navbar/Reqnav";
import Footer from "../UserContents/findjob/FooterDiv/Footer";
import { recuiterdata } from "../../apis/recuiterapi";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { InfinitySpin } from "react-loader-spinner";
import { Editrecruiter } from "../../apis/recuiterapi";

const RecruiterProfile = () => {
  const [recruiter, setRecruiter] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [Expiredate, setExpiredate] = useState({});

  const token = localStorage.getItem("recruiterToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await recuiterdata(token).then((res) => {
          setRecruiter(res.data.recruiterdata);
          setExpiredate(res.data.recruiterdata[0].subscriptionexpirydate);
        });
      })();
    } else {
      navigate("/recruiter/login");
    }
  }, []);

  const validateaField = (data) => {
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

    if (!data.Mnumber) {
      errors.Mnumber = "mobile number is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (events) => {
    events.preventDefault();
    let data = new FormData(events.currentTarget);

    data = {
      concername: data.get("concername"),
      companyname: data.get("companyname"),
      tagline: data.get("tagline"),
      website: data.get("website"),
      Email: data.get("Email"),
      discription: data.get("description"),
      Mnumber: data.get("Mnumber"),
      cimage: data.get("cimage"),
    };

    try {
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

      if (validateaField(data)) {
        setisLoading(true)(async () => {
          await Editrecruiter(token, data).then((res) => {
            if (res.data.success) {
              message.success("update resume successfully");
              window.location.reload();
              setisLoading(false);
            } else if (res.status === 500) {
              message.error(res.data.message);
              setisLoading(false);
            } else {
              message.error("something wrong");
              setisLoading(false);
            }
          });
        })();
      } else {
       
      }
    } catch (erroe) {}
  };

  return (
    <div>
      <Navbar />
      {Expiredate && (
        <div className=" w-full flex justify-center bg-slate-300 text-sm py-1 font-bold text-green-600">
          <p>
            Your subscription plan expire on {"  "}{" "}
            {moment(Expiredate).format("DD MMM, YYYY")}
          </p>
        </div>
      )}
      <div>
        <div className="container mx-auto my-5 p-5 ">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-siteviolet shadow-xl rounded-2xl">
                <div className="image overflow-hidden"></div>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={recruiter[0]?.company_image} />
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  <span>{recruiter[0]?.concern_name}</span>
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  {recruiter[0]?.company_name}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  {recruiter[0]?.discription}
                </p>
                {/* <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                        className="bg-siteviolet py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">Nov 07, 2016</span>
                            </li>
                        </ul> */}
              </div>
              <div className="my-4"></div>

              {/* <div className="bg-white p-3 hover:shadow shadow-xl rounded-2xl m-auto">
                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-siteviolet">
                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </span>
                            <span>ADD YOUR SKILLS</span>
                        </div>
                        <div className="grid grid-cols-3">
                           
                        </div>
                    </div> */}
            </div>

            <div className="w-full md:w-9/12 mx-2 h-full bg-gray-50">
              <div className="bg-white p-3 shadow-xl rounded-2xl">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700 text-left">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Rcruiter Name
                      </div>
                      <div className="px-4 py-2">
                        {recruiter[0]?.concern_name}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Company Name
                      </div>
                      <div className="px-4 py-2">
                        {recruiter[0]?.company_name}
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">Female</div>
                                </div> */}
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">
                        {recruiter[0]?.mobile_number}
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Current Address</div>
                                    <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                    <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                                </div> */}
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href="">
                          {recruiter[0]?.Email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <label
                  htmlFor="my-modal-3"
                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                >
                  Edit Profile
                </label>
              </div>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box h-[55rem] max-w-3xl">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute  right-2 top-2"
                  >
                    ✕
                  </label>
                  <>
                    {/* Hello world */}
                    <div className="awesome">
                      <form
                        className="w-full max-w-lg m-auto"
                        onSubmit={handleSubmit}
                      >
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Recruiter Name
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              name="concername"
                              id="concername"
                              type="text"
                              defaultValue={recruiter[0]?.concern_name}
                            />
                            {errors.concername && (
                              <p className="text-red-500 text-xs italic">
                                {errors.concername}
                              </p>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-last-name"
                            >
                              Company Name
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="companyname"
                              id="companyname"
                              type="text"
                              defaultValue={recruiter[0]?.company_name}
                            />
                            {errors.companyname && (
                              <p className="text-red-500 text-xs italic">
                                {errors.companyname}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Email
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              name="Email"
                              id="Email"
                              type="Email"
                              value={recruiter[0]?.Email}
                            />
                            {errors.cname && (
                              <p className="text-red-500 text-xs italic">
                                {errors.cname}
                              </p>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-last-name"
                            >
                              Contact Number
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="Mnumber"
                              id="Mnumber"
                              type="number"
                              defaultValue={recruiter[0]?.mobile_number}
                            />
                            {errors.Mnumber && (
                              <p className="text-red-500 text-xs italic">
                                {errors.Mnumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Tagline
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              name="tagline"
                              id="tagline"
                              type="text"
                              defaultValue={recruiter[0]?.tagline}
                            />
                            {errors.tagline && (
                              <p className="text-red-500 text-xs italic">
                                {errors.tagline}
                              </p>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-last-name"
                            >
                              Website
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="website"
                              id="website"
                              type="text"
                              defaultValue={recruiter[0]?.website}
                            />
                            {errors.Jobtitle && (
                              <p className="text-red-500 text-xs italic">
                                {errors.Jobtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                          <div className="w-full px-3 mt-4">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Description
                            </label>
                            <textarea
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="description"
                              id="description"
                              type="textarea"
                              defaultValue={recruiter[0]?.discription}
                            />
                            {/* {errors.edudescription && (
            <p className="text-red-500 text-xs italic">
           {errors.edudescription}
          </p>
          )} */}

                            {/* <p className="text-gray-600 text-xs mitalic">
            Make it as long and as crazy as you'd like
          </p> */}
                          </div>
                          <div className="w-full md:w-1/2 px-3 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Company Image
                            </label>
                            <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              name="cimage"
                              id="cimage"
                              type="file"
                            />
                            {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
                          </div>
                        </div>
                        <div className="mt-4">
                          {isloading ? (
                            <div className="mb-4 mt-10 flex justify-center ">
                              <InfinitySpin width="200" color="#194569" />
                            </div>
                          ) : (
                            <div className="mt-8">
                              <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                                Edit Profile
                              </button>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </>
                </div>
              </div>

              <div className="my-6"></div>

              <div className="bg-white p-3 shadow-xl rounded-2xl">
                <div className="grid grid-cols-2 px-4 py-4">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokwidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Other information</span>
                    </div>
                    <ul className="list-inside space-y-2 text-left">
                      <li>
                        <div className="text-gray-500 text-xs">Tagline</div>
                        <div className="text-teal-600">
                          {recruiter[0]?.tagline}
                        </div>
                      </li>
                      <li>
                        <div className="text-gray-500 text-xs">Web site</div>
                        <div className="text-teal-600">
                          {recruiter[0]?.website}
                        </div>
                      </li>
                      <li>
                        <div className="text-gray-500 text-xs">Description</div>
                        <div className="text-teal-600">
                          {recruiter[0]?.discription}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RecruiterProfile;
