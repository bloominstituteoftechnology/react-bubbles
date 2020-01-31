import React, { useState, useEffect } from "react";

// Components
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// Modules
import { axiosWithAuth } from '../modules/axiosWithAuth';

const BubblePage = () => {

  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log(err.response))
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} setColorList={setColorList} />
    </>
  );
};

export default BubblePage;
