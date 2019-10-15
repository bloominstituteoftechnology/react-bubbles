import React, { useState, useEffect } from "react";
// step 1 bring in your token
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
      // fetch your colors data from the server when the component mounts
     useEffect(() => {
        axiosWithAuth()
      .get('/colors')
      .then(response =>  setColorList(response.data))
        // set that data to the colorList state property
        .catch(error => console.log(error))
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
