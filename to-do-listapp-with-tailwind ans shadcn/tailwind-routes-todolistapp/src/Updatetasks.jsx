import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";
import Home from "./Home";
import { Button } from "./components/ui/button";

function Updatetasks() {
  const { state,setState } = useContext(inputContext);
  function editbutton(index){
    setState({type:'newtask',payload:state.tasks[index]})
    setState({type:'edit',payload:index+1})
  }
  function deletebutton(index){
    const updatedTasks=state.tasks.filter((_,i)=>i!==index)
    setState({type:'tasks',payload:updatedTasks})
  }
  return (
    <div className="box-border">
    {state.edit?<Home isUpdate={true}/>:null}
    <div>
      
      <ul className="mt-16 space-y-6 ">
          {state.tasks.map((task, index) => {
            return(
            <li key={index} className="
        flex flex-col items-center md:flex-row md:justify-between  
        bg-yellow-100
        px-6 py-4
        rounded-lg
        shadow-sm  
        md:w-1/2 mx-auto border-2 border-green-200 hover:border-green-400"
      >
              <span className="flex-1 text-center text-2xl font-medium">{task}</span>
              <div className="flex gap-4"><Button className="ml-10 bg-green-400 hover:bg-green-600" variant="outline" size="lg"
          onClick={()=>editbutton(index)}>Edit</Button>
              <Button className="ml-10" variant="destructive" size="lg"
          onClick={()=>deletebutton(index)}>Delete</Button></div>
             </li>
          )
})
        }
        </ul>
      
    </div></div>
  )
}
export default Updatetasks 