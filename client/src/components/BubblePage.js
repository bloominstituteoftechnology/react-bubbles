import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import {useHistory} from 'react-router-dom';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const history = useHistory();
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    axiosWithAuth().get("/api/colors")
      .then(res => {
        console.log('bubblepage.js: ', res)
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const logOut = () =>{
    localStorage.clear()
    history.push('/')

  }
  return (
    <>
      <button onClick={logOut}>Log out</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
