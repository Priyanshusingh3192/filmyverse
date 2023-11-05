import React from "react"; // Make sure to import React
import Header from "./components/Header";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Detail from "./components/Detail";
import SearchPage from "./components/SearchPage";
import { createContext,useEffect,useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AppState = createContext();

function App() {

  // const[login,setLogin] = useState(false);
  // const[username,setUsername] = useState('');
  return (
  //   <AppState.Provider value={{login,setLogin,username,setUsername}}>
    <div className="relative">
        <Header/>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addMovie" element={<AddMovie/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>

    </div>
   //  </AppState.Provider>
  );
}
export default App;
//export {AppState}
