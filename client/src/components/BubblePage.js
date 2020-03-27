import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  useEffect(() => {
    const getData = () => {
      axiosWithAuth()
        .get('/api/colors')
        .then(res => {
          console.log(res, ' is res in getData')
          setColorList(res.data)
        })
    }
    getData();
  }, [])

  // set that data to the colorList state property


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
