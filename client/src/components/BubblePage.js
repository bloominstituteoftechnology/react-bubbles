import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import AxiosWithAuth from "../utilz/AxiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

   
useEffect(()=>{
  AxiosWithAuth()
  .get('/colors')
  .then(res => {
    console.log(res)
    setColorList(res.data)
  })
  .catch(err => console.log(err))
},[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
