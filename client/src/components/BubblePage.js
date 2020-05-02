import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosAuth } from '../utils/axiosAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts

  useEffect(() => {
    axiosAuth()
    .get('/api/colors')
    .then(res => setColorList(res.data))
    .catch(err => console.log(err))
  }, [])
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <div>
        <p>
					<Link to='/' onClick={() => localStorage.removeItem('token')}>Logout</Link>
        </p>
      </div>
    </>
  );
};

export default BubblePage;
