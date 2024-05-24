/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home'
import Video from './Pages/Video/video'
import { Routes , Route } from "react-router-dom";


const App = () => {

  const [ sidebar , setSidebar] = useState(true);


  return(
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video/>}/>
      </Routes>
    </div>
  )
}

export default App;