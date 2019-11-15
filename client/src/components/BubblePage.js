import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from '../utils/AxioswithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  axiosWithAuth()
  .get ('/api/colors')
  .then(res => {
    setColorList(res.data)
      console.log(res.data,'color list')
      
  })
  .catch(err => {
      console.log(err)
  });

  if(colorList === []) {
    return(
        <p>loading...</p>
    )
    }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
