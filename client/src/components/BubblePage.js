import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/AxiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      console.log('Color Data Call', res)
      setColorList(res.data)
    })
    .catch(err => console.log(err.response))
  }, [])

  console.log('Passed props for colors', colorList)
  return (
    <div className='bubDisplay'>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
