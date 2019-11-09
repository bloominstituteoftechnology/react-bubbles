import React, { useState, useEffect } from "react";
import axios from "axios";
import apiAuth from '../utils/api.js';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    apiAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        setColorList(res.data)
      })

  }

  useEffect(() => {
    getColors();
  }, [])

  return (
    <>
      <ColorList colors={colorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
