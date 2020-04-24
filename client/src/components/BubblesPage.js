import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblesPage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    axiosWithAuth(token).get('/api/colors')
      .then(res => {
        console.log({res})
        // set that data to the colorList state property
        setColorList(res.data);
      })
      .catch(err => {
        console.log({err})
      })

  },[])



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblesPage;
