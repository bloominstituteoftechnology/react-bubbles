import React, { useState, useEffect } from "react";
import AxiosWithAuth from './axiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    AxiosWithAuth().get(`/colors`) 
    .then(res => {
      setColorList(res.data)
      console.log(res)
    })
    .catch(error => console.log(error))
  }, [])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
