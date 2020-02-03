import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect( () => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
    .then(response => {
      console.log('this is what im getting from api/colors', response.data)
      setColorList(response.data);
    }).catch(error => {
      console.log(error)
    });
  }, []);

  return (
    <>
<div>blabla {console.log('THIS IS COLOR LIST from Bubble Page', colorList)}
 {console.log('THIS IS SetColorList from Bubble Page', setColorList)}</div>
<Bubbles colors={colorList} />
      <ColorList colors={colorList} updateColors={setColorList} />
    </>
  );
};

export default BubblePage;