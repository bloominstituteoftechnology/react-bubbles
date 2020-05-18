import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from './util/AxiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    AxiosWithAuth()
      .get('/api/colors')
      .then(response => {
        setColorList(response.data);
        // console.log(colorList);
      })
      .catch(error => console.error(error));
  }, []);
 
  const updateColors = () => {
    AxiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
    <ColorList colors={colorList} updateColors={updateColors} />
    <Bubbles colors={colorList} />
  </>
);
};

export default BubblePage;
