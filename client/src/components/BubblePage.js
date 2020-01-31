import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import BubblesV2 from "./BubblesV2";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {

    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then (response => {
        console.log("Bubble data retrieved:", response);

        setColorList(response.data);
      })
      .catch (error => {
        console.log("Couldn't retrieve bubble data:", error);
      })

  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <BubblesV2 colors={colorList} />
    </>
  );
};

export default BubblePage;
