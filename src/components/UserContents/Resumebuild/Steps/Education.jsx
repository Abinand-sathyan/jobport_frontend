import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { stepperContext } from "../../../../Contexts/SteppeContext";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebase";

const Education = ({ handleClick, steps, currentstep, setEduction }) => {
  const [isloading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateaField = (data) => {
    let errors = {};

    if (!data.degree.trim()) {
      errors.degree = "degree is required";
    }

    if (!data.degreename.trim()) {
      errors.degreename = "degreename is required";
    }

    if (!data.schoolname.trim()) {
      errors.schoolname = "schoolname name is required";
    }

    if (!data.edudescription.trim()) {
      errors.edudescription = "description name is required";
    }

    if (!data.edudescription.trim()) {
      errors.edudescription = "description name is required";
    }

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
        setEduction(data);
        handleClick("next");
      } else {
       
      }
    } catch (erroe) {}
  };

  return (
    <div>
      <form
        className="bg-white mx-auto my-3 flex flex-col w-full   max-w-2xl "
        onSubmit={handleSubmit}
      >
        <div className="py-6">
          <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div className="w-full p-8 ">
              <p className="text-2xl font-semibold text-center myb-4 text-siteviolet">
                ADD EDUCATION
              </p>

              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Degree Type
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
              </div>
              {errors.degree && (
                <span className="error text-red-400">{errors.degree}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Degree Name
                  </label>
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="degreename"
                  name="degreename"
                ></input>
              </div>
              {errors.degreename && (
                <span className="error text-red-400">{errors.degreename}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    School Name
                  </label>
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="schoolename"
                  name="schoolename"
                ></input>
              </div>
              {errors.schoolname && (
                <span className="error text-red-400">{errors.schoolname}</span>
              )}

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                  Decription
                </label>
                <textarea
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="textarea"
                  name="description"
                  id="description"
                ></textarea>
              </div>
              {errors.edudescription && (
                <span className="error text-red-400">
                  {errors.edudescription}
                </span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload photo
                  </label>
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="file"
                  id="prophoto"
                  name="prophoto"
                ></input>
              </div>

              {isloading ? (
                <div className="mb-4 mt-10 flex justify-center ">
                  <InfinitySpin width="200" color="#194569" />
                </div>
              ) : (
                <div className="mt-8">
                  <button className="bg-violet-700 text-white font-bold py-4 text-xl px-4 w-full rounded hover:bg-gray-600">
                    Save My Education
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

export default Education;
