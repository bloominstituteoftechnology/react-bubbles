import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
const [colorList, setColorList] = useState([]);
const [error, setError] = useState()

useEffect(() => {
  axiosWithAuth()
    .get('/colors')
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      setError(err.response.data.message)
    })
}, [])

return (
  <>
    {error && <div className='error'>{error}</div>}
    <ColorList colors={colorList} updateColors={setColorList} />
    <Bubbles colors={colorList} />
  </>
);
};

export default BubblePage;
