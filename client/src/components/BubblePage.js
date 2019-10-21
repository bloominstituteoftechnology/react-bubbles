import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  console.log(colorList)


    


  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => setColorList(res.data))
      .catch(err => console.log(err))
  }, [])
  

  return (
    <>
    <Route exact path ='/bubblepage' render={(props) => <ColorList {...props} colors={colorList} updateColors={setColorList} /> } />
      
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
