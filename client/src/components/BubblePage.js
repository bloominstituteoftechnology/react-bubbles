import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors();
  }, []);

  const getColors = () => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => {
        console.log('BubblePage.js .get res', res);
        setColorList(res.data);
      })
      .catch(err => {
        alert('BubblePage.js .get err: ', err.res);
      });
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getColors={getColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
