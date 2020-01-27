import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../auth/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
    axiosWithAuth()
      .get("/colors")
      .then((res) =>{
        setColorList(res.data);
      })
      .catch((err)=>{
        console.log("Error: ", err);
      })

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
