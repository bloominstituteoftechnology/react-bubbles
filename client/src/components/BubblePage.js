import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from '../axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {

    console.log(localStorage.getItem('token'));

    if (colorList.length <= 0) {
      
      
      console.log(colorList.length);

      axiosWithAuth().get('/api/colors').catch(err => console.log(err)).then(res => {

        console.log(res);
        setColorList(res.data);
        
      });

    }


  });

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
