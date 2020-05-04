import React, { useState, useEffect } from "react";
import axiosWithAuth from './axiosWithAuth';
import {useHistory} from 'react-router-dom';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const history = useHistory()

    useEffect(()=>{
      axiosWithAuth().get("/api/colors")
      .then(res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },[])

    const logOut = () => {
        localStorage.clear()
        history.push('/')
    }


  return (
    <>
      <button onClick={logOut}>log out</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
