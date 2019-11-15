import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Route } from 'react-router-dom'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  useEffect(() => {
    axiosWithAuth()
    .get(`/api/colors`)
    .then(res => {
      setColorList(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>

    <Route exact path='/bubblepage' render ={ props => <ColorList {...props} colors={colorList} updateColors={setColorList} />} />
    <Bubbles colors={colorList}/> 
      {/* <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} /> */}
    </>
  );
};

export default BubblePage;
