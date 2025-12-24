import React from "react";
import { useState } from "react";
import "./App.css";



export default function App(){
    const[tasks,setTasks]=useState(['Wake up','Take a Shower','Get ready'])
    const[newtask,setNewtask]=useState('')
    const[edit,setEdit]=useState(0)
    const addButton=()=>{
      if(edit){
        const temp=[...tasks]
        temp[edit - 1] = newtask
        setTasks(temp)
        setNewtask('')
        setEdit(0)
      }
      else{
        if(newtask.trim!==''){
          setTasks([newtask,...tasks])
        setNewtask('')
        }
      }
    }
    const editbutton=(index)=>{
       setNewtask(tasks[index])
       setEdit(index+1) 
    }
    const deletebutton=(index)=>{
        const deletedTasks=tasks.filter((_,i)=>i!=index)
        setTasks(deletedTasks)
    }



    return(
      <div className="container">
      <h1 style={{ color: "red" }}>To-Do-List</h1>

        <input type='text' value={newtask} onChange={(e)=>setNewtask(e.target.value)}></input>
        <button onClick={addButton}>{edit?'Edit':'Add'}</button>
        <ul>
          {tasks.map((item,index)=>(<li key={index}>{item} 
            <button onClick={()=>deletebutton(index)}>Delete</button>
            <button onClick={() => editbutton(index)}>Edit</button>
            </li>))}
        </ul>
      </div>
    )
}
