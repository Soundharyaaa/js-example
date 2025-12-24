import React from "react";
import { useContext } from "react";
import { inputContext } from "./App";
import Home from "./Home";

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
    <>
    {state.edit?<Home isUpdate={true}/>:null}
    <div>
      
      <ul>
          {state.tasks.map((task, index) => {
            return(
            <li key={index}>
              <span className="tasklists">{task}</span>
              <button className='editbutton' onClick={()=>editbutton(index)}>Edit</button>
              <button className='deletebutton' onClick={()=>deletebutton(index)}>Delete</button>
             </li>
          )
})
        }
        </ul>
      
    </div></>
  )
}
export default Updatetasks 