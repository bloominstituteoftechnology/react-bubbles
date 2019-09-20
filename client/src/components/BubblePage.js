import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosWithAuth from '../utils/AxiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/AxiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors=()=>{
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.log(err.response))
  }

  useEffect(() => {
    getColors();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
