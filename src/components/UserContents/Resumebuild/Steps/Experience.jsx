import React from "react";
import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Country, State, City } from "country-state-city";
import { resumedata } from "../../../../apis/userapi";

const Experience = ({ handleClick, steps, currentstep, setExperience }) => {
  const [isloading, setisLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [checkresume, setCheckresume] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await resumedata(token).then((res) => {
          if (res.data.resumedata.length !== 0) {
            setCheckresume(true);
          }
        });
      })();
    }
  }, []);

  const detials = State.getAllStates("IN");

  const validateaField = (data) => {
    let errors = {};

    if (!data.cname.trim()) {
      errors.cname = "Company name is required";
    }

    if (!data.Jobtitle.trim()) {
      errors.Jobtitle = "jobtitile is required";
    }

    if (!data.country.trim()) {
      errors.country = "country name is required";
    }

    if (!data.state.trim()) {
      errors.state = "state name is required";
    }

    if (!data.city.trim()) {
      errors.city = "city name is required";
    }

    if (!data.jobtype.trim()) {
      errors.jobtype = "jobtype name is required";
    }

    if (!data.description) {
      errors.description = "description name is required";
    }

    if (!data.experience) {
      errors.experience = "experience required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (events) => {
    events.preventDefault();
    let data = new FormData(events.currentTarget);

    data = {
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
      if (validateaField(data)) {
        setExperience(data);
        handleClick("next");
      } else {
       
      }
    } catch (erroe) {}
  };

  return (
    <div>
      <form
        className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl "
        onSubmit={handleSubmit}
      >
        <div className="py-6">
          <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div className="w-full p-8 ">
              <p className="text-2xl font-semibold text-center myb-4 text-siteviolet">
                ADD EXPERIENCE
              </p>

              <div className="mt-4 text-left">
                <div
                  className="text-siteviolet focus:outline-none text-center focus:shadow-outline border border-violet-700 rounded py-2 px-4 block w-full appearance-none"
                  onClick={() => {
                    handleClick("next");
                  }}
                >
                  I Don't Have Work Experience
                </div>
              </div>

              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="cname"
                  name="cname"
                ></input>
              </div>
              {errors.cname && (
                <span className="error text-red-400">{errors.cname}</span>
              )}
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Job title
                  </label>
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="Jobtitle"
                  name="Jobtitle"
                ></input>
              </div>
              {errors.Jobtitle && (
                <span className="error text-red-400">{errors.Jobtitle}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                </div>
                <select
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  id="country"
                  name="country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country, index) => (
                    <option key={index} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <span className="error text-red-400">{errors.country}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    State/Province
                  </label>
                </div>
                <select
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  id="state"
                  name="state"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {selectedCountry &&
                    State.getStatesOfCountry(selectedCountry).map(
                      (state, index) => (
                        <option key={index} value={state.isoCode}>
                          {state.name}
                        </option>
                      )
                    )}
                </select>
              </div>
              {errors.state && (
                <span className="error text-red-400">{errors.state}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select City
                  </label>
                </div>
                <select
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  id="city"
                  name="city"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {selectedState &&
                    City.getCitiesOfState(selectedCountry, selectedState).map(
                      (city, index) => (
                        <option key={index} value={city.isoCode}>
                          {city.name}
                        </option>
                      )
                    )}
                </select>
              </div>
              {errors.city && (
                <span className="error text-red-400">{errors.city}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Job type
                  </label>
                </div>
                <select
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="jobtype"
                  name="jobtype"
                >
                  <option value="On-site">On-site</option>
                  <option value="remote">remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              {errors.jobtype && (
                <span className="error text-red-400">{errors.jobtype}</span>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Year of exprerience
                  </label>
                </div>
                <input
                  className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="number"
                  id="experience"
                  name="experience"
                ></input>
              </div>
              {errors.experience && (
                <span className="error text-red-400">{errors.experience}</span>
              )}

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                  description
                </label>
                <textarea
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="textarea"
                  name="description"
                  id="description"
                ></textarea>
              </div>
              {errors.description && (
                <span className="error text-red-400">{errors.description}</span>
              )}

              {isloading ? (
                <div className="mb-4 mt-10 flex justify-center ">
                  <InfinitySpin width="200" color="#194569" />
                </div>
              ) : (
                <div className="mt-8">
                  <button className="bg-violet-700 text-white font-bold py-4 text-xl px-4 w-full rounded hover:bg-gray-600">
                    Save my Experience
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

export default Experience;
