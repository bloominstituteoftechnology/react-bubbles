import React, { useState, useEffect } from "react";
import axios from "axios";
// Not needed???
// step 1 bring in your token
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      // fetch your colors data from the server when the component mounts
      .get('/colors')
      .then(response => {
        // set that data to the colorList state property
        setColorList(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
