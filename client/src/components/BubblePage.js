import React, { useState, useEffect } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    getColorList();
  }, []);

  const getColorList = () => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <ColorList colors={colorList} getColorList={getColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
