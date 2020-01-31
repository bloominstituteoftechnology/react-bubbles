import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  // useEffect(() => {
  //   axios 
  //   .get("http://localhost:5000/")
  //     .then(res => {
  //       console.log(`this is response from port 5000:`, res)
  //     })
  //     .catch(err => {
  //       console.log(`this is error from port 5000:`, err)

  //     })
  // }, [])

  return (
    <>
      {/* <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} /> */}

      <h1>BUBBLES PAGE</h1>
    </>
  );
};

export default BubblePage;
