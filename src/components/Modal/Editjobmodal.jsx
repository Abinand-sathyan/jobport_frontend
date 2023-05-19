import React from "react";
import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { InfinitySpin } from "react-loader-spinner";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import "./modal.css";

const Editjobmodal = ({ isVisible, SingleJobdata, onclose }) => {
  const [errors, setErrors] = useState({});
  const [isloading, setisloading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const token = localStorage.getItem("recruiterToken");

  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onclose();
  };

  const validateaField = (data) => {
    let errors = {};
   

    if (!data.jobtitle.trim()) {
      errors.jobtitle = "jobtitle name is required";
    }

    if (!data.category) {
      errors.category = "Select category";
    }

    if (!data.Jobtype) {
      errors.Jobtype = "Select Jobtype";
    }

    if (!data.workplacetype) {
      errors.workplacetype = "Select workplacetype";
    }

    if (!data.jobdescription) {
      errors.jobdescription = "jobdescription required";
    }

    if (!data.Jobqualification) {
      errors.Jobqualification = "Jobqualification required";
    }

    if (!data.responsibilities) {
      errors.responsibilities = "responsibilities required";
    }

    if (!data.Jobqualification) {
      errors.Mnumber = "Jobqualification required";
    }

    if (!data.salaryrange) {
      errors.salaryranger = "salaryrange required";
    }

    if (!data.vaccancy) {
      errors.vaccancy = "vaccancy required";
    }

    if (!data.postlogo) {
      errors.postlogo = "logo required";
    }

    if (!data.Location) {
      errors.Location = "Location required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      jobtitle: data.get("jobtitle"),
      category: data.get("category"),
      Jobtype: data.get("jobtype"),
      workplacetype: data.get("workplace"),
      jobdescription: data.get("jobdescription"),
      Jobqualification: data.get("jobqualification"),
      responsibilities: data.get("responsibilities"),
      salaryrange: data.get("salaryrange"),
      vaccancy: data.get("vaccancy"),
      Location: data.get("location"),
      postlogo: data.get("postlogo"),
    };

    try {
      if (true) {
        setisloading(true);
        setError(null);
        if (data.postlogo.name) {
          const date = Date.now();
          const rand = Math.random();
          const image = data.postlogo;
          const imageRef = ref(
            storage,
            `/postlogo/${date}${rand}_${image?.name}`
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
            data.postlogo = downloadURL;
          });
        } else {
          data.postlogo = "";
        }

        const response = await axios({
          url: "/recruiter/editjob",
          method: "post",
          data: { data, SingleJobdata },
          headers: { recuitertoken: token },
        });

        const result = response.data;
        if (result.success) {
          setisloading(false);
          message.success("Edit job successfully!");
        } else {
          setisloading(false);
          setError(result.message);
          message.error(result.message).then(() => {
            setError(null);
          });
        }
      }
    } catch (error) {
   
    }
  };

  return (
    <div
      id="wrapper"
      className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[900px] flex flex-col overflow-y-auto h-[600px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => {
            onclose();
          }}
        >
          x
        </button>
        <div className="bg-white p-1 rounded-lg  overflow-y-auto">
          <form
            className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl"
            onSubmit={handlesubmit}
          >
            <div className="py-6">
              <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="w-full p-8 ">
                  <p className="text-2xl font-semibold text-center myb-4 text-site">
                    Edit Job
                  </p>
                  <p className="text-sm font-semibold text-left py-4  text-blue-700">
                    You Know What you are locking for.We help you find them.
                    Post your open position and hire fast the best talent.
                  </p>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                      Job title
                    </label>
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="text"
                      id="jobtitle"
                      name="jobtitle"
                      defaultValue={SingleJobdata.jobTitle}
                    ></input>
                  </div>
                  {errors.jobtitle && (
                    <span className="error text-red-400">
                      {errors.jobtitle}
                    </span>
                  )}
                  <div className="flex-grow flex gap-4 justify-between">
                    <div className="mt-4 w-56">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Category
                      </label>
                      <div className="mb-3 w-full">
                        <select
                          data-te-select-init
                          className="w-full  h-11 border"
                          name="category"
                          defaultValue={SingleJobdata.jobCategory}
                        >
                          <option
                            value="Sofware Engineer"
                            name="Sofware Engineer"
                          >
                            Sofware Engineer
                          </option>
                          <option
                            value="Mechanical Engineer"
                            name="Mechanical Engineer"
                          >
                            Mechanical Engineer
                          </option>
                        </select>
                      </div>
                    </div>
                    {errors.category && (
                      <span className="error text-red-400">
                        {errors.category}
                      </span>
                    )}
                    <div className="mt-4 w-56 ">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Work place type
                      </label>
                      <div className="mb-3 w-full ">
                        <select
                          data-te-select-init
                          className="w-full  h-11 border"
                          name="workplace"
                        >
                          <option value="On-site">On-site</option>
                          <option value="remote">remote</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {errors.workplacetype && (
                    <span className="error text-red-400">
                      {errors.workplacetype}
                    </span>
                  )}
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                      Job decription
                    </label>
                    <textarea
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="textarea"
                      name="jobdescription"
                      id="jobdescription"
                      defaultValue={SingleJobdata.jobDiscription}
                    ></textarea>
                  </div>
                  {errors.jobdescription && (
                    <span className="error text-red-400">
                      {errors.jobdescription}
                    </span>
                  )}
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                      Job qualification
                    </label>
                    <textarea
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="textarea"
                      name="jobqualification"
                      id="jobqualification"
                      defaultValue={SingleJobdata.jobQualification}
                    ></textarea>
                  </div>
                  {errors.Jobqualification && (
                    <span className="error text-red-400">
                      {errors.Jobqualification}
                    </span>
                  )}
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                      Responsibilities
                    </label>
                    <textarea
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="textarea"
                      name="responsibilities"
                      id="responsibilities"
                      defaultValue={SingleJobdata.responsibilities}
                    ></textarea>
                  </div>
                  {errors.responsibilities && (
                    <span className="error text-red-400">
                      {errors.responsibilities}
                    </span>
                  )}
                  <div className="flex-grow flex gap-4 justify-between">
                    <div className="mt-4 w-56">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Job type
                      </label>
                      <div className="mb-3 w-full ">
                        <select
                          data-te-select-init
                          className="w-full h-11 border"
                          name="jobtype"
                        >
                          <option value="Full time">Full time</option>
                          <option value="part time">Part TIME</option>
                          <option value="Internship">Internship</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                    {errors.Jobtype && (
                      <span className="error text-red-400">
                        {errors.Jobtype}
                      </span>
                    )}
                    <div className="mt-4 w-56 ">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Salary Range
                      </label>
                      <input
                        className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 block w-full  appearance-none"
                        type="text"
                        id="salaryrange"
                        name="salaryrange"
                        defaultValue={SingleJobdata.salaryRange}
                      ></input>
                      {errors.salaryranger && (
                        <span className="error text-red-400">
                          {errors.salaryranger}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow flex gap-4 justify-between">
                    <div className="mt-4 w-56">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Vaccancy
                      </label>
                      <input
                        className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 block w-full   appearance-none"
                        type="number"
                        id="vaccancy"
                        name="vaccancy"
                        defaultValue={SingleJobdata.vaccancy}
                      ></input>
                      {errors.vaccancy && (
                        <span className="error text-red-400">
                          {errors.vaccancy}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 w-56 ">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Location
                      </label>
                      <input
                        className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 block w-full  appearance-none"
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={SingleJobdata.location}
                      ></input>
                      {errors.Location && (
                        <span className="error text-red-400">
                          {errors.Location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow flex gap-4 justify-between">
                    <div className="mt-4 w-56">
                      <label className="block text-gray-700 text-sm   text-left font-bold mb-2">
                        Post Logo
                      </label>
                      <input
                        className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 pl-1 block w-full   appearance-none"
                        type="file"
                        src={SingleJobdata.image}
                        id="postlogo"
                        name="postlogo"
                        // defaultValue={SingleJobdata.image}
                      ></input>
                    </div>
                  </div>
                  {errors.postlogo && (
                    <span className="error text-red-400">
                      {errors.postlogo}
                    </span>
                  )}
                  {isloading ? (
                    <div className="mb-4 mt-10 flex justify-center ">
                      <InfinitySpin width="200" color="#194569" />
                    </div>
                  ) : (
                    <div className="mt-8">
                      <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editjobmodal;
