import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { stepperContext } from "../../Contexts/SteppeContext";
import Stepper from "../../components/UserContents/Resumebuild/Stepper";
import StepperController from "../../components/UserContents/Resumebuild/StepperController";
import Experience from "../../components/UserContents/Resumebuild/Steps/Experience";
import Education from "../../components/UserContents/Resumebuild/Steps/Education";
import Final from "../../components/UserContents/Resumebuild/Steps/Final";
import Arrowright from "../../lottiefiles/Arrowright.json";
import Lottie from "lottie-react";
import Condact from "../../components/UserContents/Resumebuild/Steps/Condact";
import { resumebuild } from "../../apis/userapi";
import { message } from "antd";

const Resume = () => {
  const [currentstep, setCurrentSteps] = useState(1);
  const [userData, setUserdata] = useState("");
  const [finalData, setFinaldata] = useState([]);
  const [experience, setExperience] = useState({});
  const [education, setEduction] = useState({});

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token && Object.keys(education).length !== 0) {
      (async function invoke() {
        const resumedata = {
          experience,
          education,
        };
        await resumebuild(token, resumedata).then((res) => {});
      })();
    }
  }, [education]);

  const steps = ["Experience", "Education", "complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Experience
            handleClick={handleClick}
            setExperience={setExperience}
            steps={steps}
            currentstep={currentstep}
          />
        );
      case 2:
        return (
          <Education
            handleClick={handleClick}
            steps={steps}
            setEduction={setEduction}
            currentstep={currentstep}
          />
        );
      case 3:
        return (
          <Final
            handleClick={handleClick}
            steps={steps}
            currentstep={currentstep}
          />
        );
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentstep;
    direction === "next" ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentSteps(newStep);
  };

  return (
    <div className="w-full  h-full bg-slate-50 absolute">
      <div className="flex">
        <Lottie animationData={Arrowright} className="h-4 ml-3 mt-1 pr-2" />
        <Link
          to="/findjobs"
          href="#"
          className="text-lg font-semibold leading-6 text-violet-800"
        >
          click back to home
        </Link>
      </div>
      <div className="md:w-1/3 relative mx-auto shadow-xl rounded-2xl pb-2  bg-white">
        <div className="container horizontal mt-5">
          <Stepper steps={steps} currentstep={currentstep} />
        </div>

        <div className="my-3 p-3">
          <stepperContext.Provider
            value={{
              setUserdata,
              userData,
              setFinaldata,
              finalData,
            }}
          >
            {displayStep(currentstep)}
          </stepperContext.Provider>
        </div>
        {/*        
      <StepperController
     
      handleClick={handleClick}
      steps={steps}
      currentstep={currentstep}/> */}
      </div>
    </div>
  );
};

export default Resume;
