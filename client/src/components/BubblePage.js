import React, { useState, useEffect } from "react";
import axiosWithAuth  from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColors= () => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
      setColorList(res.data);
      // console.log(colorList);
    })
    .catch(err => console.log(err, "Oof, an error has occured while retreiving the bubble page"))

  }
  useEffect(() => {
    getColors();
  }, []);
  return (
    <>
      <ColorList colors={colorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
