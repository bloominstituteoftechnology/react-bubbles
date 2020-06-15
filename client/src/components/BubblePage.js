import React, { useState, useEffect } from 'react';
import Bubbles from './Bubbles';
import ColorList from './ColorList';
import axiosWithAuth from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.error(err.message, err.response)
      })
  }

  useEffect(() => {
      getColors()
  }, []);

  return (
    <>
      <ColorList colors={colorList} Colors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;