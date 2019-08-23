import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth.js'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  useEffect( () => {
    axiosWithAuth().get('http://www.localhost:5000/api/colors')
    .then(response => {
      setColorList(response.data)
      console.log("in BubblePage useEffect", response.data)
    })
    .catch(error => {console.log("error in BubblePage useEffect", error)})

 }, [])



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
