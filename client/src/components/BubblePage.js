import React, { useState, useEffect } from "react";
// import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
 useEffect(() => {
        props.grabColors()
    }, [])


  return (
    <>
     {props.colorList.map((user, id) =>
      <ColorList key={id} colors={colorList} updateColors={setColorList} />)}

      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
