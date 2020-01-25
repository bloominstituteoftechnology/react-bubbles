import React, { useState, useEffect } from "react";
import axiosWithAuth from '../authenticate/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const updateColors = () => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(response => {
      setColorList(response.data);
    })
    .catch(error => {
      console.log('GET Error', error);
    })
  };

  useEffect(() => {
    updateColors();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
