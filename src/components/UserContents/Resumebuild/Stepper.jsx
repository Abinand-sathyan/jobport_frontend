import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentstep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updatedStep = (stepNumber, steps) => {
    const newSteps = [...steps];

    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const StepsState = steps.map((step, index) => {
      return Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      );
    });
    stepRef.current = StepsState;

    const current = updatedStep(currentstep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentstep]);

  const displaySteps = newStep.map((steps, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-violet-900">
          <div
            className={`rounded-full transition duration-500 ease-in-out
                border-2 border-gray-300 h-12 w-12 flex items-center justify-center
                py-3 ${
                  steps.selected
                    ? "bg-siteviolet text-white font-bold border border-siteviolet"
                    : ""
                }`}
          >
            {steps.selected ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs
                font-medium uppercase ${
                  steps.highlighted ? "text-gray-900" : "text-gray-400"
                }`}
          >
            {steps.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500
            ease-in-out ${
              steps.completed ? "border-siteviolet" : "border-gray-300"
            }`}
        ></div>
      </div>
    );
  });
  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
