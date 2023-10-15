import React from "react"; // Make sure to import React
import Header from "./components/Header";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Detail from "./components/Detail";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <div className="relative">
       {/* Wrap your entire app in Router */}
        <Header/>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addMovie" element={<AddMovie/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
    </div>
  );
}
export default App;
