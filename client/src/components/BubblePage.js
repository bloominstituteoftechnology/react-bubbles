import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';
import axios from 'axios';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
     .get('/api/colors')
     .then(res => //did a console.log & didn't see any data displayed in console
       setColorList(res.data)) //added { colorList: b/c (res.data) didn't render either}
     .catch(err => console.log(err));
    
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} newcolor={colorList}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
