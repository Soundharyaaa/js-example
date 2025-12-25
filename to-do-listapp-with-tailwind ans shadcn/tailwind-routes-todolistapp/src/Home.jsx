import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

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
      <div className="flex flex-col items-center pt-10">
         <h1 className="text-4xl font-bold text-red-500 mb-6 ">
    To-Do List
  </h1>
      <Input
        type="text"
        value={state.newtask} placeholder='Enter a Task' onChange={HandleChange}
        className="w-full h-8 md:w-1/4 md:h-14
    px-4 
    border-2 border-gray-300
    rounded-lg
    text-2xl text-gray-800
    placeholder-gray-400
    outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
    transition-all duration-300 " />
    

    <Button onClick={addbutton} variant="default" size="lg" className="mt-8">
        {props.isUpdate?'Done':'Add'}
      </Button>
    </div>
  );
}

export default Home;
