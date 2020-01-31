import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  useEffect(()=>{
    axiosWithAuth()
    .get('/api/colors')
    .then(res => (console.log('Fetching Colors From Server...',res.data), setColorList(res.data)))
    .catch(err => console.log(err.error))
    console.log('BubblePage.js : colorList State :', colorList)
  },[])
  // set that data to the colorList state property
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
