import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";

function Reviewtasks() {
  const { state,setState } = useContext(inputContext);

  return (
    <div>
        <ul className="mt-16 space-y-6 ">
          {state.tasks.map((task, index) => (
            <li key={index}
            className="
         flex items-center justify-center
  bg-yellow-100
  px-4 py-4
  rounded-lg
  shadow-sm
  w-full md:w-1/2
  mx-auto
  border-2 border-green-200
  hover:border-green-400
      ">
              <span className="text-2xl text-gray-800 ml-50">{task}</span>
             
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Reviewtasks;
