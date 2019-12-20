import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import AxiosWithAuth from "../utilz/AxiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [state, setState] = useState(false);

   
useEffect(()=>{
  AxiosWithAuth()
  .get('/colors')
  .then(res => {
    console.log(res)
    setColorList(res.data)
  })
  .catch(err => console.log(err))
},[state])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setState={setState} state={state}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
