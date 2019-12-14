import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const ColorWrap = styled.div`
width: 20%;
height: 67.5%;
margin-left:25%;
margin-top:3%;

box-shadow: 5px 5px 5px green;
`

const BubbleWrap = styled.div`
  padding: 2%;
  height: 50%;
  width: 22%;
  margin-top:6%;
  margin-left: 5%;
  box-shadow: 5px 5px 5px orange;
 
`


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect (() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(result => {
        console.log('kd:Bubblepage:axios.get: colors', result)
        setColorList(result.data)
      })
      .catch (error => {
        console.log('kd:Bubblepage:axios.catch:error', error)
      });
  }, []);

  return (
    <>
      <ColorWrap className = 'colorwrap-div'>
          <ColorList colors={colorList} updateColors={setColorList} />
      </ColorWrap>

      <BubbleWrap className = "bubblewrap">
          <Bubbles colors={colorList} />
      </BubbleWrap>
    </>
  );
};

export default BubblePage;
