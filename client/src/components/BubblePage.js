import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => {
      console.log(res, "this is the colors data");
      setColorList(res.data);
    })
    .catch(err => console.log(err, "ERROR: could not get the colors data"))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
