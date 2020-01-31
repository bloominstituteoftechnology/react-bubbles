import React, { useState, useEffect } from "react";
import {GetToken} from "../utils/GetToken";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColors = () => {
    GetToken()
      .get("/colors")
      .then(response => {
        console.log(response)
        setColorList(response.data)
      })
      .catch(error => console.log("ERROR FETCHING COLORS" , error))
  };

  useEffect(() => {
    getColors();
      }, []
  );

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
