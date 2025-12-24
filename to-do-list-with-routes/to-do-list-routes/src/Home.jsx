import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";

function Home(props) {
  const { state, setState } = useContext(inputContext);
  function HandleChange(e){
       setState({type:'newtask',payload:e.target.value})
  }
  function addbutton(){
    if(state.edit){
        const temp=[...state.tasks]
        temp[state.edit-1]=state.newtask
        setState({type:'tasks',payload:temp})
        setState({type:'newtask',payload:''})
        setState({type:'edit',payload:0})
    }
    else{
        if(state.newtask.trim()!==""){setState({type:'tasks',payload:[state.newtask,...state.tasks]})
        setState({type:'newtask',payload:''})}
        }
  }

  return (
    <div>
      <input
        type="text"
        value={state.newtask} placeholder='Enter a Task' onChange={HandleChange}/>

      <button onClick={addbutton} className="addbutton">
        {props.isUpdate?'Done':'Add'}
      </button>
    </div>
  );
}

export default Home;

