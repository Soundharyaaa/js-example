import { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {defaultvalue} from "./provider/default"
import reducer from "./provider/reducer";
import Home from "./Home";
import Reviewtasks from "./Reviewtasks";
import Updatetasks from "./Updatetasks";
import Navbar from './navbar';
import "./App.css";
export const inputContext = createContext();

function App() {
  const [state, setState] = useReducer(reducer, defaultvalue);
  const value={state,setState}
  return (
    <inputContext.Provider value={value}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<Reviewtasks />} />
          <Route path="/update" element={<Updatetasks />} /> 
        </Routes>
      </BrowserRouter>
    </inputContext.Provider>
  );
}

export default App;

