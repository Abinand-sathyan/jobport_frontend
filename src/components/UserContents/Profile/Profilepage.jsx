/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import profile from "../../../Assets/profilephoto.jpg";
import { Country, State, City } from "country-state-city";
import { resumedata } from "../../../apis/userapi";
import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { Editresume } from "../../../apis/userapi";

const Profilepage = ({ userdata, resumedatas }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [resumdetails, setResumeDetails] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [reload, setReload] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isloading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await resumedata(token).then((res) => {
          setResumeDetails(res.data.resumedata);
        });
      })();
    }
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // },[]);

  const validateaField = (data) => {
    let errors = {};

    if (!data.degree.trim()) {
      errors.degree = "degree is required";
    }
    if (!data.degreename.trim()) {
      errors.degreename = "degreename is required";
    }
    // if (!data.schoolname.trim()) {
    //   errors.schoolname= "schoolname name is required";
    // }
    if (!data.edudescription.trim()) {
      errors.edudescription = "description name is required";
    }
    if (!data.edudescription.trim()) {
      errors.edudescription = "description name is required";
    }
    if (!data.cname.trim()) {
      errors.cname = "Company name is required";
    }
    if (!data.Jobtitle.trim()) {
      errors.Jobtitle = "jobtitile is required";
    }
    //   if (!data.country.trim()) {
    //     errors.country= "country name is required";
    //   }
    //  ;
    //   if (!data.state.trim()) {
    //     errors.state= "state name is required";
    //   }
    //   if (!data.city.trim()) {
    //     errors.city= "city name is required";
    //   }
    if (!data.jobtype.trim()) {
      errors.jobtype = "jobtype name is required";
    }
    if (!data.description) {
      errors.description = "description name is required";
    }

    // if (!data.experience) {
    //   errors.experience = "experience required";
    // }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (events) => {
    events.preventDefault();
    let data = new FormData(events.currentTarget);

    data = {
      degree: data.get("degree"),
      degreename: data.get("degreename"),
      schoolname: data.get("schoolename"),
      edudescription: data.get("description"),
      prophoto: data.get("prophoto"),
      cname: data.get("cname"),
      Jobtitle: data.get("Jobtitle"),
      country: data.get("country"),
      state: data.get("state"),
      city: data.get("city"),
      jobtype: data.get("jobtype"),
      experience: data.get("experience"),
      description: data.get("description"),
    };

    try {
      if (data.prophoto.name) {
        const date = Date.now();
        const rand = Math.random();
        const image = data.prophoto;
        const imageRef = ref(
          storage,
          `/employerimage/${date}${rand}_${image?.name}`
        );

        const toBase64 = (image) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          }).catch((err) => {});
        const imgBase = await toBase64(image);

        await uploadString(imageRef, imgBase, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          data.prophoto = downloadURL;
        });
      } else {
        data.prophoto = "";
      }

      if (validateaField(data)) {
        setisLoading(true)(async () => {
          await Editresume(token, data).then((res) => {
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
      <div className="container mx-auto my-5 p-5 ">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-siteviolet shadow-xl rounded-2xl">
              <div className="image overflow-hidden"></div>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={resumedatas[0]?.employeeimage} />
                </div>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {userdata?.first_name}
                <span> </span>
                {userdata?.last_name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {resumedatas[0]?.Jobtitle}
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {resumedatas[0]?.exdescription}
              </p>
            </div>
            <div className="my-4"></div>
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
                    <>
                      {/* Hello world */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </>
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700 text-left">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{userdata?.first_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{userdata?.last_name}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{userdata?.mobile_number}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        {userdata?.email_address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <label
                htmlFor="my-modal-3"
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
              >
                Edit Your Resume Information
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
                            Company name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="cname"
                            name="cname"
                            type="text"
                            defaultValue={resumdetails[0]?.cname}
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
                            Job Title
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="Jobtitle"
                            name="Jobtitle"
                            type="text"
                            defaultValue={resumdetails[0]?.Jobtitle}
                          />
                          {errors.Jobtitle && (
                            <p className="text-red-500 text-xs italic">
                              {errors.Jobtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Job type
                          </label>

                          <select
                            className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="text"
                            id="jobtype"
                            name="jobtype"
                            defaultValue={resumdetails[0]?.jobtype}
                          >
                            <option value="On-site">On-site</option>
                            <option value="remote">remote</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                          {errors.jobtype && (
                            <p className="text-red-500 text-xs italic">
                              {errors.jobtype}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Experience
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="experience"
                            name="experience"
                            type="number"
                            value={parseInt(resumdetails[0]?.experience)}
                          />
                          {errors.experience && (
                            <p className="text-red-500 text-xs italic">
                              {errors.experience}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mt-5 mb-3 md:mb-0">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            DEGREE TYPE
                          </label>
                          <select
                            className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            id="degree"
                            name="degree"
                          >
                            <option>Elemantary School</option>
                            <option>EQF1</option>
                            <option>EQF2</option>
                            <option>High School</option>
                            <option>AVS/DVS</option>
                            <option>Vocational/AD/DCS/ACS</option>
                            <option>Bachelor/College Diploma</option>
                            <option>Master</option>
                            <option>Doctorate</option>
                          </select>
                          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mt-5 mb-3 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Degree name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="degreename"
                            name="degreename"
                            type="text"
                            defaultValue={resumdetails[0]?.degreename}
                          />
                          {errors.degreename && (
                            <p className="text-red-500 text-xs italic">
                              {errors.degreename}
                            </p>
                          )}
                          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
                        </div>

                        <div className="w-full px-3 mt-4">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Education description
                          </label>
                          <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="description"
                            id="description"
                            type="text"
                            defaultValue={resumdetails[0]?.edudescription}
                          />
                          {errors.edudescription && (
                            <p className="text-red-500 text-xs italic">
                              {errors.edudescription}
                            </p>
                          )}

                          {/* <p className="text-gray-600 text-xs mitalic">
            Make it as long and as crazy as you'd like
          </p> */}
                        </div>
                        <div className="w-full md:w-1/2 px-3 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            upload profile
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="prophoto"
                            name="prophoto"
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
                              login
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
                    <span className="tracking-wide">Experience</span>
                  </div>
                  <ul className="list-inside space-y-2 text-left">
                    <li>
                      <div className="text-gray-500 text-xs">Comapny Name</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.cname}
                      </div>
                    </li>
                    <li>
                      <div className="text-gray-500 text-xs">Job title</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.Jobtitle}
                      </div>
                    </li>
                    <li>
                      <div className="text-gray-500 text-xs">jobtype</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.jobtype}
                      </div>
                    </li>

                    <li>
                      <div className="text-gray-500 text-xs">experience</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.experience}
                        <span> </span>
                        <span>Year</span>
                      </div>
                    </li>

                    <li>
                      <div className="text-gray-500 text-xs">
                        country,state,city
                      </div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.country},{resumedatas[0]?.state},
                        {resumedatas[0]?.city}
                      </div>
                    </li>
                  </ul>
                </div>
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
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Education</span>
                  </div>
                  <ul className="list-inside space-y-2 text-left">
                    <li>
                      <div className="text-gray-500 text-xs">Qualification</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.degree}
                      </div>
                    </li>
                    <li>
                      <div className="text-gray-500 text-xs">Degree Name</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.degreename}
                      </div>
                    </li>
                    <li>
                      <div className="text-gray-500 text-xs">Discription</div>
                      <div className="text-teal-600">
                        {resumedatas[0]?.edudescription}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
