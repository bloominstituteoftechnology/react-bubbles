import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [newGet, setNewGet] = useState();

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    setNewGet(false);
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log("GET", res.data);
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, [newGet]);



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
