import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  useEffect(() => {
    getData();
  }, [setColorList])

  const getData = () => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        console.log(res, ' is res in getData')
        // set that data to the colorList state property
        setColorList(res.data)
      })
  }


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getData={getData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
