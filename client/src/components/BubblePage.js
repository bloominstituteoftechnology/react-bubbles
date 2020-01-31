import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../Utils/Auth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  axiosWithAuth()
    .get("/colors")
    .then(res => {
      console.log(res.data);
      setColorList(...colorList, [res.data]);
    })
    .catch(err => console.log(err));

    console.log(colorList, 'BubblePage')
  return (
    <div>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
