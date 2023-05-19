import React from "react";

const StepperController = ({ handleClick, steps, currentstep }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={() => {
          handleClick();
        }}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300
      hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
        currentstep === 1 ? "opacity-50 cursor-not-allowed" : ""
      }`}
      >
        Back
      </button>

      <button
        onClick={() => {
          handleClick("next");
        }}
        className="bg-siteviolet text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer 
      hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentstep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperController;
