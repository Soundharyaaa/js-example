import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";

function Reviewtasks() {
  const { state,setState } = useContext(inputContext);

  return (
    <div>
        <ul>
          {state.tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
             
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Reviewtasks;

